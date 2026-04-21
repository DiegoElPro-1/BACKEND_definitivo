import type { HttpContext } from '@adonisjs/core/http'

export default class MaterialesController {
  /**
   * Listar todos los materiales aceptados y sus valores en puntos
   */
  public async index({ response }: HttpContext) {
    return response.ok({
      mensaje: 'Catálogo de materiales aceptados obtenido',
      data: [
        { id: 1, nombre: 'Plástico', puntos_por_kilo: 10 },
        { id: 2, nombre: 'Vidrio', puntos_por_kilo: 15 }
      ]
    })
  }

  /**
   * Crear un nuevo tipo de material (Admin)
   */
  public async store({ request, response }: HttpContext) {
    const data = request.all()
    return response.created({
      mensaje: 'Nuevo material añadido al catálogo',
      data
    })
  }

  /**
   * Actualizar valor o nombre del material
   */
  public async update({ params, request, response }: HttpContext) {
    return response.ok({
      mensaje: `Material ID: ${params.id} actualizado`
    })
  }

  /**
   * Eliminar un material del catálogo
   */
  public async destroy({ params, response }: HttpContext) {
    return response.ok({
      mensaje: `Material ID: ${params.id} eliminado del sistema`
    })
  }
}