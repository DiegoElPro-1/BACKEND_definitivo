import Aliado from '#models/aliado'
import type { HttpContext } from '@adonisjs/core/http'

export default class AliadosController {
  /**
   * Listar todos los aliados (GET /api/aliados)
   */
  async index({ response }: HttpContext) {
    const aliados = await Aliado.all()
    return response.ok(aliados)
  }

  /**
   * Crear un nuevo aliado (POST /api/aliados)
   */
  async store({ request, response }: HttpContext) {
    // Recibimos los datos del JSON
    const data = request.only(['nombre_negocio', 'correo', 'password', 'rol'])

    // Validación de seguridad para el SENA: Solo rol 'aliado'
    if (data.rol !== 'aliado') {
      return response.forbidden({ 
        mensaje: 'Error: En este endpoint solo se pueden registrar aliados' 
      })
    }

    // Creamos el registro en la BD
    // Nota: Mapeamos nombre_negocio (del JSON) a nombreNegocio (del Modelo)
    const aliado = await Aliado.create({
      nombreNegocio: data.nombre_negocio,
      correo: data.correo,
      password: data.password,
      rol: data.rol
    })

    return response.created({
      mensaje: 'Aliado creado correctamente',
      aliado
    })
  }

  /**
   * Ver un aliado específico (GET /api/aliados/:id)
   */
  async show({ params, response }: HttpContext) {
    try {
      const aliado = await Aliado.findOrFail(params.id)
      return response.ok(aliado)
    } catch (error) {
      return response.notFound({ mensaje: 'Aliado no encontrado' })
    }
  }

  /**
   * Actualizar datos del aliado (PUT /api/aliados/:id)
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const aliado = await Aliado.findOrFail(params.id)
      const data = request.only(['nombre_negocio', 'correo', 'telefono'])

      aliado.merge({
        nombreNegocio: data.nombre_negocio,
        correo: data.correo
        // Agrega aquí más campos si los necesitas
      })

      await aliado.save()
      return response.ok({ mensaje: 'Datos del aliado actualizados', aliado })
    } catch (error) {
      return response.notFound({ mensaje: 'No se pudo actualizar, aliado no encontrado' })
    }
  }

  /**
   * Eliminar aliado (DELETE /api/aliados/:id)
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const aliado = await Aliado.findOrFail(params.id)
      await aliado.delete()
      return response.ok({ mensaje: 'Aliado eliminado correctamente' })
    } catch (error) {
      return response.notFound({ mensaje: 'No se pudo eliminar, aliado no encontrado' })
    }
  }
}