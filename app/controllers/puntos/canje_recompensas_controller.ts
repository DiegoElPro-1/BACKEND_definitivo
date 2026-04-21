import type { HttpContext } from '@adonisjs/core/http'

export default class CanjeRecompensasController {
  /**
   * Listar beneficios disponibles para el usuario
   */
  public async listar({ response }: HttpContext) {
    return response.ok({
      mensaje: 'Lista de recompensas disponibles para canje'
    })
  }

  /**
   * Ejecutar el canje de puntos por un premio
   * Requerimiento: ACP-003
   */
  public async ejecutar({ request, response }: HttpContext) {
    const { usuario_id, recompensa_id } = request.all()
    
    return response.ok({
      mensaje: 'Canje realizado con éxito',
      codigo_canje: 'REC-998877'
    })
  }
}