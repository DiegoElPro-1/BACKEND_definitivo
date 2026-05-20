import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Entrega from '#models/entrega'
import DetalleEntrega from '#models/detalle_entrega'
import MovimientoPunto from '#models/movimiento_punto'
import Material from '#models/material'
import Usuario from '#models/usuario'
import db from '@adonisjs/lucid/services/db'

export default class MaterialesController {

  // GET /api/encargado/materiales
  async index({ response }: HttpContext) {
    const materiales = await Material.query().orderBy('id_material', 'asc')
    return response.ok(materiales)
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

  // GET /api/encargado/entregas
  async indexEntregas({ response }: HttpContext) {
    const entregas = await Entrega.query()
      .preload('usuario')
      .preload('estadoEntrega')
      .preload('detalles', (q) => q.preload('material'))
      .orderBy('fecha_entrega', 'desc')

    return response.ok(entregas)
  }

  // GET /api/encargado/entregas/:id
  async showEntrega({ params, response }: HttpContext) {
    const entrega = await Entrega.query()
      .where('id_entrega', params.id)
      .preload('usuario')
      .preload('estadoEntrega')
      .preload('detalles', (q) => q.preload('material'))
      .firstOrFail()

    return response.ok(entrega)
  }

  // POST /api/encargado/entregas
  async storeEntrega({ request, response }: HttpContext) {
    const { idUsuario, idPunto, idEstadoEntrega, materiales, observacion } = request.only([
      'idUsuario',
      'idPunto',
      'idEstadoEntrega',
      'observacion',
      'materiales',
    ])

    await Usuario.findOrFail(idUsuario)

    const pesoTotal = materiales.reduce(
      (acc: number, m: any) => acc + parseFloat(m.peso), 0
    )
    const puntosTotales = materiales.reduce(
      (acc: number, m: any) => acc + parseInt(m.puntosGenerados), 0
    )

    const entrega = await db.transaction(async (trx) => {
      const nuevaEntrega = await Entrega.create(
        {
          idUsuario,
          idPunto: idPunto ?? null,
          idEstadoEntrega: idEstadoEntrega ?? 1,
          pesoTotal,
          puntosTotales,
          observacion: observacion ?? null,
          fechaEntrega: DateTime.now(),
        },
        { client: trx }
      )

      for (const mat of materiales) {
        await DetalleEntrega.create(
          {
            idEntrega: nuevaEntrega.idEntrega,
            idMaterial: mat.idMaterial,
            peso: parseFloat(mat.peso),
            puntosGenerados: parseInt(mat.puntosGenerados),
          },
          { client: trx }
        )
      }

      await MovimientoPunto.create(
        {
          idUsuario,
          idEntrega: nuevaEntrega.idEntrega,
          tipoMovimiento: 'ganados',
          puntos: puntosTotales,
          descripcion: `Entrega registrada por encargado`,
          fechaMovimiento: DateTime.now(),
        },
        { client: trx }
      )

      return nuevaEntrega
    })

    await entrega.load('usuario')
    await entrega.load('detalles', (q) => q.preload('material'))

    return response.created({
      mensaje: 'Entrega registrada correctamente',
      entrega,
    })
  }
  // PUT /api/encargado/entregas/:id/estado
async actualizarEstadoEntrega({ params, request, response }: HttpContext) {
  const entrega = await Entrega.findOrFail(params.id)
  const { idEstadoEntrega } = request.only(['idEstadoEntrega'])

  await entrega.merge({ idEstadoEntrega }).save()
  await entrega.load('estadoEntrega')

  return response.ok({
    mensaje: 'Estado de entrega actualizado',
    entrega,
  })
}
}