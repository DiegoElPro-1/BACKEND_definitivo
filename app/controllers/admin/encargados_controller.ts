import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'

export default class EncargadosController {
  async index({ response }: HttpContext) {
    const encargados = await Usuario.query()
      .where('id_rol', 4)
      .preload('rol')
      .preload('estadoUsuario')
    return response.ok({ encargados })
  }

  async show({ params, response }: HttpContext) {
    const encargado = await Usuario.query()
      .where('id_usuario', params.id)
      .where('id_rol', 4)
      .firstOrFail()
    return response.ok({ encargado })
  }

  async store({ request, response }: HttpContext) {
    const datos = request.only(['nombre', 'correo', 'password', 'telefono'])

    const correoExiste = await Usuario.findBy('correo', datos.correo)
    if (correoExiste) {
      return response.conflict({ mensaje: 'Ya existe una cuenta con ese correo' })
    }

    const encargado = await Usuario.create({
      idRol: 4,
      idEstadoUsuario: 1,
      nombre: datos.nombre,
      correo: datos.correo,
      password: await hash.make(datos.password),
      telefono: datos.telefono ?? null,
      fechaRegistro: DateTime.now(),
    })

    return response.created({ mensaje: 'Encargado creado correctamente', encargado })
  }

  async update({ params, request, response }: HttpContext) {
    const encargado = await Usuario.query()
      .where('id_usuario', params.id)
      .where('id_rol', 4)
      .firstOrFail()

    const datos = request.only(['nombre', 'telefono', 'imagen', 'idEstadoUsuario'])
    encargado.merge(datos)
    await encargado.save()
    return response.ok({ mensaje: 'Encargado actualizado correctamente', encargado })
  }

  async destroy({ params, response }: HttpContext) {
    const encargado = await Usuario.query()
      .where('id_usuario', params.id)
      .where('id_rol', 4)
      .firstOrFail()

    await encargado.delete()
    return response.ok({ mensaje: 'Encargado eliminado correctamente' })
  }
}