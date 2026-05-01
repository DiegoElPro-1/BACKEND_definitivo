import type { HttpContext } from '@adonisjs/core/http'
import Aliado from '#models/aliado'
import PuntoReciclaje from '#models/punto_reciclaje'

export default class PerfilAliadoController {
  async mostrar({ auth, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    // Buscar el aliado vinculado por correo
    const aliado = await Aliado.query()
      .where('correo', usuario.correo)
      .preload('estadoAliado')
      .preload('puntosReciclaje', (q) => q.preload('estadoPunto'))
      .firstOrFail()

    return response.ok({ aliado })
  }

  async actualizar({ auth, request, response }: HttpContext) {
    const usuario = auth.user!

    const aliado = await Aliado.query()
      .where('correo', usuario.correo)
      .firstOrFail()

    const datos = request.only([
      'nombre',
      'tipoNegocio',
      'descripcion',
      'direccion',
      'telefono',
    ])

    aliado.merge(datos)
    await aliado.save()

    return response.ok({
      mensaje: 'Perfil del aliado actualizado correctamente',
      aliado,
    })
  }

  async agregarPunto({ auth, request, response }: HttpContext) {
    const usuario = auth.user!

    const aliado = await Aliado.query()
      .where('correo', usuario.correo)
      .firstOrFail()

    const datos = request.only([
      'nombre',
      'direccion',
      'latitud',
      'longitud',
      'horario',
    ])

    const punto = await PuntoReciclaje.create({
      idAliado: aliado.idAliado,
      idEstadoPunto: 1, // activo
      ...datos,
    })

    return response.created({
      mensaje: 'Punto de reciclaje agregado correctamente',
      punto,
    })
  }

  async actualizarPunto({ auth, params, request, response }: HttpContext) {
    const usuario = auth.user!

    const aliado = await Aliado.query()
      .where('correo', usuario.correo)
      .firstOrFail()

    const punto = await PuntoReciclaje.query()
      .where('id_punto', params.id)
      .where('id_aliado', aliado.idAliado)
      .firstOrFail()

    const datos = request.only([
      'nombre',
      'direccion',
      'latitud',
      'longitud',
      'horario',
      'idEstadoPunto',
    ])

    punto.merge(datos)
    await punto.save()

    return response.ok({
      mensaje: 'Punto de reciclaje actualizado correctamente',
      punto,
    })
  }
}