import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Canje from '#models/canje'
import Usuario from '#models/usuario'
import Recompensa from '#models/recompensa'
import MovimientoPunto from '#models/movimiento_punto'
import db from '@adonisjs/lucid/services/db'

// Genera código tipo ECO-XXXX
function generarCodigo(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const parte = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('')
  return `ECO-${parte}`
}

export default class CanjesController {

  // GET /api/encargado/canjes
  async index({ response }: HttpContext) {
    const canjes = await Canje.query()
      .preload('usuario')
      .preload('recompensa')
      .preload('estadoCanje')
      .orderBy('fecha_canje', 'desc')

    return response.ok(canjes)
  }

  // GET /api/encargado/canjes/:id
  async show({ params, response }: HttpContext) {
    const canje = await Canje.query()
      .where('id_canje', params.id)
      .preload('usuario')
      .preload('recompensa')
      .preload('estadoCanje')
      .firstOrFail()

    return response.ok(canje)
  }

  // POST /api/encargado/canjes
  async store({ request, response }: HttpContext) {
    const { idUsuario, idRecompensa, idEstadoCanje } = request.only([
      'idUsuario',
      'idRecompensa',
      'idEstadoCanje',
    ])

    const usuario = await Usuario.findOrFail(idUsuario)
    const recompensa = await Recompensa.findOrFail(idRecompensa)

    const movimientos = await MovimientoPunto.query().where('id_usuario', idUsuario)
    const puntosDisponibles = movimientos.reduce((acc, mov) => {
      if (mov.tipoMovimiento === 'ganados') return acc + mov.puntos
      if (mov.tipoMovimiento === 'descontados') return acc - mov.puntos
      return acc + mov.puntos
    }, 0)

    if (puntosDisponibles < recompensa.puntosRequeridos) {
      return response.badRequest({
        mensaje: 'El usuario no tiene suficientes puntos para esta recompensa',
        puntosDisponibles,
        puntosRequeridos: recompensa.puntosRequeridos,
      })
    }

    const canje = await db.transaction(async (trx) => {
      const nuevoCanje = await Canje.create(
        {
          idUsuario,
          idRecompensa,
          idEstadoCanje: idEstadoCanje ?? 1,
          codigoCanje: generarCodigo(),
          puntosUsados: recompensa.puntosRequeridos,
          fechaCanje: DateTime.now(),
        },
        { client: trx }
      )

      await MovimientoPunto.create(
        {
          idUsuario,
          idEntrega: null,
          tipoMovimiento: 'descontados',
          puntos: recompensa.puntosRequeridos,
          descripcion: `Canje: ${recompensa.nombre} (${nuevoCanje.codigoCanje})`,
          fechaMovimiento: DateTime.now(),
        },
        { client: trx }
      )

      return nuevoCanje
    })

    await canje.load('usuario')
    await canje.load('recompensa')
    await canje.load('estadoCanje')

    return response.created({
      mensaje: 'Canje realizado correctamente',
      canje,
    })
  }

  // PUT /api/encargado/canjes/:id/estado
  async actualizarEstado({ params, request, response }: HttpContext) {
    const canje = await Canje.findOrFail(params.id)
    const { idEstadoCanje } = request.only(['idEstadoCanje'])

    await canje.merge({ idEstadoCanje }).save()
    await canje.load('estadoCanje')

    return response.ok({
      mensaje: 'Estado del canje actualizado',
      canje,
    })
  }

  // GET /api/encargado/usuarios?q=nombre
  async buscarUsuarios({ request, response }: HttpContext) {
    const { q } = request.qs()

    const usuarios = await Usuario.query()
      .where((query) => {
        query
          .where('nombre', 'like', `%${q ?? ''}%`)
          .orWhere('correo', 'like', `%${q ?? ''}%`)
      })
      .select('id_usuario', 'nombre', 'correo', 'telefono')
      .limit(10)

    const usuariosConPuntos = await Promise.all(
      usuarios.map(async (u) => {
        const movimientos = await MovimientoPunto.query().where('id_usuario', u.idUsuario)
        const puntos = movimientos.reduce((acc, mov) => {
          if (mov.tipoMovimiento === 'ganados') return acc + mov.puntos
          if (mov.tipoMovimiento === 'descontados') return acc - mov.puntos
          return acc + mov.puntos
        }, 0)
        return { ...u.serialize(), puntosDisponibles: puntos }
      })
    )

    return response.ok(usuariosConPuntos)
  }
}