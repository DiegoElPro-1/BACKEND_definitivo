import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'

export default class PerfilController {
  async mostrar({ auth, response }: HttpContext) {
    const usuario = await Usuario.query()
      .where('id_usuario', auth.user!.idUsuario)
      .preload('rol')
      .preload('estadoUsuario')
      .firstOrFail()

    return response.ok({ usuario })
  }

  async actualizar({ auth, request, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(auth.user!.idUsuario)

    const datos = request.only(['nombre', 'telefono', 'imagen'])
    usuario.merge(datos)
    await usuario.save()

    return resp