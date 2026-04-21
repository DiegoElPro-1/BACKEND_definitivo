import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  /**
   * Maneja el inicio de sesión
   * Según requerimiento de Registro e Inicio de Sesión
   */
  public async handle({ request, response }: HttpContext) {
    const { email } = request.only(['email', 'password'])

    return response.ok({
      mensaje: `Intento de inicio de sesión para: ${email}`,
      token: 'aquí_irá_el_token_oat'
    })
  }
}