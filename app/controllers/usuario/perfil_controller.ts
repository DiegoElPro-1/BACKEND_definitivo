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

    return response.ok({
      idUsuario: usuario.idUsuario,
      nombre: usuario.nombre,
      correo: usuario.correo,
      telefono: usuario.telefono,
      imagen: usuario.imagen,
      fechaRegistro: usuario.fechaRegistro,
      rol: usuario.rol.nombre,
      estado: usuario.estadoUsuario.nombre,
    })
  }

  async actualizar({ auth, request, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(auth.user!.idUsuario)

    const datos = request.only(['nombre', 'telefono', 'imagen'])
    usuario.merge(datos)
    await usuario.save()

    return response.ok({
      mensaje: 'Perfil actualizado correctamente',
      usuario: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        telefono: usuario.telefono,
        imagen: usuario.imagen,
      },
    })
  }

  async cambiarPassword({ auth, request, response }: HttpContext) {
    const { passwordActual, passwordNuevo } = request.only([
      'passwordActual',
      'passwordNuevo',
    ])

    const usuario = await Usuario.findOrFail(auth.user!.idUsuario)

    const passwordValido = await hash.verify(usuario.password, passwordActual)
    if (!passwordValido) {
      return response.unauthorized({
        mensaje: 'La contraseña actual es incorrecta',
      })
    }

    usuario.password = passwordNuevo
    await usuario.save()

    return response.ok({
      mensaje: 'Contraseña actualizada correctamente',
    })
  }
}