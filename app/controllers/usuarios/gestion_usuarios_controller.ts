import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'

export default class GestionUsuariosController {
  
  // ✅ LISTAR TODO (GET /api/usuarios)
  public async index({ response }: HttpContext) {
    const usuarios = await Usuario.all()
    return response.ok(usuarios)
  }

  // ✅ CREAR CON VALIDACIÓN DE ROL (POST /api/usuarios)
  public async store({ request, response }: HttpContext) {
    const data = request.only(['nombre', 'correo', 'password', 'rol', 'telefono'])

    // 🔴 VALIDACIÓN DE ROL (Punto 4 de tu guía)
    if (data.rol !== 'usuario') {
      return response.status(403).json({ 
        error: 'Validación fallida', 
        mensaje: 'El rol debe ser "usuario" para registrarse aquí.' 
      })
    }

    try {
      const usuario = await Usuario.create(data)
      return response.created({
        mensaje: 'Usuario creado y validado correctamente',
        usuario
      })
    } catch (error) {
      return response.badRequest({ mensaje: 'Error al crear', error: error.message })
    }
  }

  // ✅ VER UN USUARIO POR ID (GET /api/usuarios/:id)
  public async show({ params, response }: HttpContext) {
    try {
      const usuario = await Usuario.findOrFail(params.id)
      return response.ok(usuario)
    } catch (error) {
      return response.notFound({ mensaje: 'Usuario no encontrado' })
    }
  }

  // ✅ ACTUALIZAR DATOS (PUT /api/usuarios/:id)
  public async update({ params, request, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(params.id)
    const data = request.only(['nombre', 'telefono', 'correo'])
    
    usuario.merge(data)
    await usuario.save()
    
    return response.ok({ mensaje: 'Datos actualizados', usuario })
  }

  // ✅ ELIMINAR (DELETE /api/usuarios/:id)
  public async destroy({ params, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(params.id)
    await usuario.delete()
    return response.ok({ mensaje: 'Usuario eliminado correctamente' })
  }

  // ✅ CAMBIAR ESTADO (PATCH /api/usuarios/:id/estado)
  public async cambiarEstado({ params, request, response }: HttpContext) {
    const id = params.id
    if (!id) return response.badRequest({ mensaje: 'ID no enviado' })

    try {
      const usuario = await Usuario.findOrFail(params.id)
      const { esta_activo } = request.only(['esta_activo'])

      // Actualizamos el campo (Asegúrate que exista en tu modelo)
      usuario.merge({ esta_activo }) 
      await usuario.save()

      return response.ok({
        mensaje: 'Estado actualizado correctamente',
        usuario
      })
    } catch (error) {
      return response.notFound({ mensaje: 'Usuario no encontrado' })
    }
  }
}