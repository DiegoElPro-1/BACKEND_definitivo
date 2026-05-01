import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import { actualizarUsuarioValidator } from '#validators/admin/usuario'

export default class UsuariosController {
  async index({ response }: HttpContext) {
    const usuarios = await Usuario.query().preload('rol').preload('estadoUsuario')
    return response.ok({ usuarios })
  }

  async show({ params, response }: HttpContext) {
    const usuario = await Usuario.query()
      .where('id_usuario', params.id)
      .preload('rol')
      .preload('estadoUsuario')
      .firstOrFail()
    return response.ok({ usuario })
  }

  async update({ params, request, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(params.id)
    const datos = await request.validateUsing(actualizarUsuarioValidator)
    usuario.merge(datos)
    await usuario.save()
    return response.ok({ mensaje: 'Usuario actualizado correctamente', usuario })
  }

  async destroy({ params, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(params.id)
    await usuario.delete()
    return response.ok({ mensaje: 'Usuario eliminado correctamente' })
  }
}