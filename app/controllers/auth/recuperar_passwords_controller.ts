import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import Usuario from '#models/usuario'
import {
  solicitarCodigoValidator,
  verificarCodigoValidator,
  restablecerPasswordValidator,
} from '#validators/auth/recuperar_password'

export default class RecuperarPasswordsController {
  // ══════════════════════════════════════════════════════════════════════════
  // PASO 1 — El usuario envía su correo para recibir el código
  // POST /api/auth/recuperar-password/solicitar
  // Body: { correo }
  // ══════════════════════════════════════════════════════════════════════════
  async solicitarCodigo({ request, response }: HttpContext) {
    const { correo } = await request.validateUsing(solicitarCodigoValidator)

    const usuario = await Usuario.findBy('correo', correo)

    // Siempre respondemos igual para no revelar si el correo existe en el sistema
    if (!usuario) {
      return response.ok({
        mensaje: 'Si el correo existe, recibirás un código de recuperación',
      })
    }

    // Generar código aleatorio de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000).toString()

    // Guardar en BD con expiración de 15 minutos
    usuario.codigoRecuperacion = codigo
    usuario.codigoExpiracion = DateTime.now().plus({ minutes: 15 })
    await usuario.save()

    // En producción: aquí se enviaría el código por correo (SMTP / Mailgun / etc.)
    // Por ahora se retorna en la respuesta para facilitar el desarrollo y las pruebas

    return response.ok({
      mensaje: 'Código de recuperación generado correctamente',
      codigo, // ⚠️ QUITAR EN PRODUCCIÓN — solo para desarrollo/pruebas
      expiracion: usuario.codigoExpiracion,
    })
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PASO 2 — El usuario envía el código para verificarlo antes de cambiar pass
  // POST /api/auth/recuperar-password/verificar
  // Body: { correo, codigo }
  // ══════════════════════════════════════════════════════════════════════════
  async verificarCodigo({ request, response }: HttpContext) {
    const { correo, codigo } = await request.validateUsing(verificarCodigoValidator)

    const usuario = await Usuario.findBy('correo', correo)

    if (!usuario || !usuario.codigoRecuperacion || !usuario.codigoExpiracion) {
      return response.badRequest({
        mensaje: 'Código inválido o no solicitado',
      })
    }

    // Verificar expiración
    if (DateTime.now() > usuario.codigoExpiracion) {
      // Limpiar código expirado
      usuario.codigoRecuperacion = null
      usuario.codigoExpiracion = null
      await usuario.save()

      return response.badRequest({
        mensaje: 'El código ha expirado. Solicita uno nuevo.',
      })
    }

    // Verificar que el código coincida
    if (usuario.codigoRecuperacion !== codigo) {
      return response.badRequest({
        mensaje: 'Código incorrecto',
      })
    }

    return response.ok({
      mensaje: 'Código verificado correctamente. Puedes establecer tu nueva contraseña.',
    })
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PASO 3 — El usuario envía el código + nueva contraseña para restablecer
  // POST /api/auth/recuperar-password/restablecer
  // Body: { correo, codigo, nuevaPassword }
  // ══════════════════════════════════════════════════════════════════════════
  async restablecerPassword({ request, response }: HttpContext) {
    const { correo, codigo, nuevaPassword } = await request.validateUsing(
      restablecerPasswordValidator
    )

    const usuario = await Usuario.findBy('correo', correo)

    if (!usuario || !usuario.codigoRecuperacion || !usuario.codigoExpiracion) {
      return response.badRequest({
        mensaje: 'Solicitud inválida. Solicita un nuevo código de recuperación.',
      })
    }

    // Verificar expiración
    if (DateTime.now() > usuario.codigoExpiracion) {
      usuario.codigoRecuperacion = null
      usuario.codigoExpiracion = null
      await usuario.save()

      return response.badRequest({
        mensaje: 'El código ha expirado. Solicita uno nuevo.',
      })
    }

    // Verificar que el código coincida
    if (usuario.codigoRecuperacion !== codigo) {
      return response.badRequest({
        mensaje: 'Código incorrecto',
      })
    }

    // Todo correcto — hashear y guardar la nueva contraseña, limpiar el código
    usuario.password = await hash.make(nuevaPassword)
    usuario.codigoRecuperacion = null
    usuario.codigoExpiracion = null
    await usuario.save()

    return response.ok({
      mensaje: 'Contraseña restablecida correctamente. Ya puedes iniciar sesión.',
    })
  }
}