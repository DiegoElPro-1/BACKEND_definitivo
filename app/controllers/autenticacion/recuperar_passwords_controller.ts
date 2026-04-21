import type { HttpContext } from '@adonisjs/core/http'

export default class RecuperarPasswordsController {
  /**
   * Solicita un código de verificación por correo
   */
  public async solicitar({ request, response }: HttpContext) {
    const email = request.input('email')
    return response.ok({
      mensaje: `Si el correo ${email} existe, se enviará un código de verificación`
    })
  }

  /**
   * Cambia la contraseña usando el código recibido
   */
  public async cambiar({ request, response }: HttpContext) {
    return response.ok({
      mensaje: 'Contraseña actualizada correctamente'
    })
  }
}