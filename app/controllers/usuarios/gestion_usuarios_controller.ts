import type { HttpContext } from '@adonisjs/core/http'

export default class GestionUsuariosController {
  /**
   * Muestra la lista de todos los usuarios
   */
  public async listar({ response }: HttpContext) {
    return response.ok({
      mensaje: 'Lista de usuarios obtenida (Admin)',
      data: [] 
    })
  }

  /**
   * Muestra el perfil de un solo usuario por ID
   */
  public async verUno({ params, response }: HttpContext) {
    return response.ok({
      mensaje: `Detalles del usuario con ID: ${params.id}`
    })
  }

  /**
   * Actualiza los datos del usuario
   */
  public async actualizar({ params, request, response }: HttpContext) {
    const datos = request.all()
    return response.ok({
      mensaje: `Usuario ${params.id} actualizado con éxito`,
      datos_recibidos: datos
    })
  }

  /**
   * Elimina un usuario del sistema
   */
  public async eliminar({ params, response }: HttpContext) {
    return response.ok({
      mensaje: `Usuario ${params.id} ha sido eliminado`
    })
  }

  /**
   * ACTIVA o DESACTIVA a un usuario (Suspensión)
   * Requerimiento: AP-001
   */
  public async cambiarEstado({ params, request, response }: HttpContext) {
    const { estado } = request.only(['estado']) // true o false
    return response.ok({
      mensaje: `El estado del usuario ${params.id} ahora es: ${estado ? 'Activo' : 'Suspendido'}`
    })
  }
}