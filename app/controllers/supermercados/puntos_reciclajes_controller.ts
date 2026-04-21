import type { HttpContext } from '@adonisjs/core/http'

export default class PuntosReciclajesController {
  public async index({ response }: HttpContext) {
    return response.ok({ mensaje: 'Listado de supermercados aliados' })
  }

  public async store({ request, response }: HttpContext) {
    return response.created({ mensaje: 'Nuevo punto de reciclaje creado' })
  }

  public async show({ params, response }: HttpContext) {
    return response.ok({ mensaje: `Viendo punto de reciclaje ID: ${params.id}` })
  }

  public async update({ params, response }: HttpContext) {
    return response.ok({ mensaje: `Punto de reciclaje ${params.id} modificado` })
  }

  public async destroy({ params, response }: HttpContext) {
    return response.ok({ mensaje: `Punto de reciclaje ${params.id} eliminado` })
  }
}