import type { HttpContext } from '@adonisjs/core/http'
import Canje from '#models/canje'

export default class CanjesAdminController {
  async index({ response }: HttpContext) {
    const canjes = await Canje.query()
      .preload('usuario')
      .preload('recompensa')
      .preload('estadoCanje')
      .orderBy('id_canje', 'desc')

    return response.ok({ canjes })
  }

  async show({ params, response }: HttpContext) {
    const canje = await Canje.query()
      .where('id_canje', params.id)
      .preload('usuario')
      .preload('recompensa')
      .preload('estadoCanje')
      .firstOrFail()

    return response.ok({ canje })
  }

  async actualizarEstado({ params, request, response }: HttpContext) {
    const canje = await Canje.findOrFail(params.id)
    const { idEstadoCanje } = request.only(['idEstadoCanje'])
    canje.merge({ idEstadoCanje })
    await canje.save()
    return response.ok({ mensaje: 'Estado actualizado correctamente', canje })
  }
}