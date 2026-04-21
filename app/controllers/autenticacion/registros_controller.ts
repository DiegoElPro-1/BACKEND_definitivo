import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'

export default class RegistrosController {
  public async handle({ request, response }: HttpContext) {
    const datos = request.only(['nombre_completo', 'correo_electronico', 'password'])

    // Validar si el correo ya existe
    const usuarioExistente = await Usuario.findBy('correo_electronico', datos.correo_electronico)
    if (usuarioExistente) {
      return response.badRequest({ mensaje: 'El correo electrónico ya está registrado' })
    }

    // Crear usuario (rol por defecto 'usuario' y 'esta_activo' true por migración)
    const nuevoUsuario = await Usuario.create(datos)

    return response.created({
      mensaje: 'Usuario registrado exitosamente',
      id: nuevoUsuario.id
    })
  }
}