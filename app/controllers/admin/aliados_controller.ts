import type { HttpContext } from '@adonisjs/core/http'
import Aliado from '#models/aliado'

export default class AliadosController {
  async index({ response }: HttpContext) {
    const aliados = await Aliado.query().preload('estadoAliado').preload('puntosReciclaje')
    return response.ok({ aliados })
  }

  async show({ params, response }: HttpContext) {
    const aliado = await Aliado.query()
      .where('id_aliado', params.id)
      .preload('estadoAliado')
      .preload('puntosReciclaje')
      .firstOrFail()
    return response.ok({ aliado })
  }

  async store({ request, response }: HttpContext) {
    const datos = request.only([
      'nombre', 'tipoNegocio', 'descripcion',
      'direccion', 'telefono', 'correo', 'comision',
    ])
    const aliado = await Aliado.create({ ...datos, idEstadoAliado: 1 })
    return response.created({ mensaje: 'Aliado creado correctamente', aliado })
  }

  async update({ params, request, response }: HttpContext) {
    const aliado = await Aliado.findOrFail(params.id)
    const datos = request.only([
      'nombre', 'tipoNegocio', 'descripcion',
      'direccion', 'telefono', 'correo', 'comision', 'idEstadoAliado',
    ])
    aliado.merge(datos)
    await aliado.save()
    return response.ok({ mensaje: 'Aliado actualizado correctamente', aliado })
  }

  async destroy({ params, response }: HttpContext) {
    const aliado = await Aliado.findOrFail(params.id)
    await aliado.delete()
    return response.ok({ mensaje: 'Aliado eliminado correctamente' })
  }
}