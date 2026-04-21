import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'

export default class GestionUsuariosController {
  
  public async listar({ response }: HttpContext) {
    const usuarios = await Usuario.all()
    return response.ok(usuarios)
  }

  public async verUno({ params, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(params.id)
    return response.ok(usuario)
  }

  public async actualizar({ params, request, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(params.id)
    const datos = request.only(['nombre_completo', 'rol'])
    
    usuario.merge(datos)
    await usuario.save()
    
    return response.ok({ mensaje: 'Usuario actualizado', usuario })
  }

  // REQUERIMIENTO ESPECIAL: Activar/Desactivar
  public async cambiarEstado({ params, request, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(params.id)
    const { esta_activo } = request.only(['esta_activo'])

    usuario.esta_activo = esta_activo
    await usuario.save()

    return response.ok({ 
      mensaje: `Usuario ${usuario.esta_activo ? 'activado' : 'desactivado'} correctamente` 
    })
  }

  // Borrado físico
  public async eliminar({ params, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(params.id)
    await usuario.delete()
    return response.ok({ mensaje: 'Usuario eliminado de la base de datos' })
  }
}