import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'

export default class AdministradoresController {
  async index({ response }: HttpContext) {
    const admins = await Usuario.query()
      .where('id_rol', 1)
      .preload('rol')
      .preload('estadoUsuario')
    return response.ok({ admins })
  }

  async store({ request, response }: HttpContext) {
    const datos = request.only(['nombre', 'correo', 'password', 'telefono'])

    const correoExiste = await Usuario.findBy('correo', datos.correo)
    if (correoExiste) {
      return response.conflict({ mensaje: 'Ya existe una cuenta con ese correo' })
    }

    const admin = await Usuario.create({
      idRol: 1,
      idEstadoUsuario: 1,
      nombre: datos.nombre,
      correo: datos.correo,
      password: await hash.make(datos.password),
      telefono: datos.telefono ?? null,
      fechaRegistro: DateTime.now(),
    })

    return response.created({ mensaje: 'Administrador creado correctamente', admin })
  }

  async update({ params, request, response }: HttpContext) {
    const admin = await Usuario.query()
      .where('id_usuario', params.id)
      .where('id_rol', 1)
      .firstOrFail()

    const datos = request.only(['nombre', 'telefono', 'imagen', 'idEstadoUsuario'])
    admin.merge(datos)
    await admin.save()
    return response.ok({ mensaje: 'Administrador actualizado correctamente', admin })
  }

  async destroy({ params, response }: HttpContext) {
    const admin = await Usuario.query()
      .where('id_usuario', params.id)
      .where('id_rol', 1)
      .firstOrFail()

    await admin.delete()
    return response.ok({ mensaje: 'Administrador eliminado correctamente' })
  }
}