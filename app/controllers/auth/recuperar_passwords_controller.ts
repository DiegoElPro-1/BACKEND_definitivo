import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'

export default class RecuperarPasswordsController {
  // Paso 1 — El usuario pide el código de recuperación
  async solicitarCodigo({ request, response }: HttpContext) {
    const { correo } = request.only(['correo'])

    const usuario = await Usuario.findBy('correo', correo)

    // Siempre respondemos igual para no revelar si el correo existe
    if (!usuario) {
      return response.ok({
        mensaje: 'Si el correo existe, recibirás un código de recuperación',
      })
    }

    // Generar código de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000).toString()
    const expiracion = new Date(Date.now() + 15 * 60 * 1000) // 15 minutos

    // Para desarrollo — retornar el código directamente
    return response.ok({
      mensaje: 'Código de recuperación generado',
      codigo, // quitar en producción
      expiracion,
      nota: 'En producción este código se enviaría al correo del usuario',
    })
  }

  // Paso 2 — El usuario envía la nueva contraseña
  async restablecerPassword({ request, response }: HttpContext) {
    const { correo, nuevaPassword } = request.only([
      'correo',
      'nuevaPassword',
    ])

    const usuario = await Usuario.findBy('correo', correo)

    if (!usuario) {
      return response.notFound({
        mensaje: 'Usuario no encontrado',
      })
    }

    usuario.password = await hash.make(nuevaPassword)
    await usuario.save()

    return response.ok({
      mensaje: 'Contraseña restablecida correctamente',
    })
  }
}