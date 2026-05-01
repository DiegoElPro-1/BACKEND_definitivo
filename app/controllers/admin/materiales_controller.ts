import type { HttpContext } from '@adonisjs/core/http'
import Material from '#models/material'

export default class MaterialesController {
  async index({ response }: HttpContext) {
    const materiales = await Material.query().preload('estadoMaterial')
    return response.ok({ materiales })
  }

  async show({ params, response }: HttpContext) {
    const material = await Material.query()
      .where('id_material', params.id)
      .preload('estadoMaterial')
      .firstOrFail()
    return response.ok({ material })
  }

  async store({ request, response }: HttpContext) {
    const datos = request.only([
      'nombre', 'descripcion', 'tipoResiduo',
      'colorCaneca', 'indicacionDisposicion', 'puntosPorKg', 'imagen',
    ])
    const material = await Material.create({ ...datos, idEstadoMaterial: 1 })
    return response.created({ mensaje: 'Material creado correctamente', material })
  }

  async update({ params, request, response }: HttpContext) {
    const material = await Material.findOrFail(params.id)
    const datos = request.only([
      'nombre', 'descripcion', 'tipoResiduo',
      'colorCaneca', 'indicacionDisposicion', 'puntosPorKg', 'imagen', 'idEstadoMaterial',
    ])
    material.merge(datos)
    await material.save()
    return response.ok({ mensaje: 'Material actualizado correctamente', material })
  }

  async destroy({ params, response }: HttpContext) {
    const material = await Material.findOrFail(params.id)
    await material.delete()
    return response.ok({ mensaje: 'Material eliminado correctamente' })
  }
}