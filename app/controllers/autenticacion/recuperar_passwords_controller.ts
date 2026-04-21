import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'

export default class RecuperarPasswordsController {
  /**
   * Solicita un código (Lógica de envío de correo)
   */
  public async solicitar({ request, response }: HttpContext) {
    const correo = request.input('correo_electronico')
    
    // Aquí iría la lógica para generar un token temporal y enviarlo por mail
    return response.ok({
      mensaje: `Si el correo ${correo} existe, se enviará un código de verificación`
    })
  }

  /**
   * Cambia la contraseña (Requerimiento: Validar antigua y actualizar a nueva)
   * Este método es para cuando el usuario está LOGUEADO y quiere cambiar su clave.
   */
  public async cambiarConVerificacion({ auth, request, response }: HttpContext) {
    try {
      const usuario = auth.user! // Obtenemos al usuario autenticado
      const { password_actual, password_nueva } = request.only([
        'password_actual', 
        'password_nueva'
      ])

      // 1. Verificar que la contraseña actual escrita sea la correcta
      const esValida = await hash.verify(usuario.password, password_actual)
      if (!esValida) {
        return response.badRequest({ mensaje: 'La contraseña actual no es correcta' })
      }

      // 2. Hashear y guardar la nueva
      usuario.password = password_nueva
      await usuario.save()

      return response.ok({
        mensaje: 'Tu contraseña ha sido actualizada con éxito'
      })
    } catch (error) {
      return response.internalServerError({ mensaje: 'Error al actualizar la contraseña' })
    }
  }

  /**
   * Cambia la contraseña usando el código recibido (Reset desde fuera del login)
   */
  public async cambiar({ request, response }: HttpContext) {
    // Aquí se validaría el "token" que llegó al correo
    return response.ok({
      mensaje: 'Contraseña restablecida correctamente mediante código'
    })
  }
}