import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'

export default class LoginController {
  public async handle({ request, response }: HttpContext) {
    const { correo_electronico, password } = request.only(['correo_electronico', 'password'])

    const usuario = await Usuario.findBy('correo_electronico', correo_electronico)
    
    if (!usuario) {
      return response.unauthorized({ mensaje: 'Credenciales inválidas' })
    }

    // REQUERIMIENTO: Verificar si el admin lo desactivó
    if (!usuario.esta_activo) {
      return response.forbidden({ mensaje: 'Esta cuenta ha sido desactivada por el administrador' })
    }

    const passwordValida = await hash.verify(usuario.password, password)
    if (!passwordValida) {
      return response.unauthorized({ mensaje: 'Credenciales inválidas' })
    }

    // Generar Token
    const token = await Usuario.accessTokens.create(usuario)

    return response.ok({
      mensaje: 'Bienvenido al sistema',
      token: token.value,
      usuario: {
        nombre: usuario.nombre_completo,
        rol: usuario.rol
      }
    })
  }
}