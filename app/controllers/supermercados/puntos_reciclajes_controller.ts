import type { HttpContext } from '@adonisjs/core/http'
import Punto from '#models/punto'

export default class PuntosReciclajesController {

  // ✅ LISTAR PUNTOS (IMPORTANTE)
  public async index({ response }: HttpContext) {
    const puntos = await Punto.all()
    return response.ok(puntos)
  }

  // 🔥 OPCIONAL (para pruebas rápidas)
  public async store({ request, response }: HttpContext) {
    const datos = request.only(['nombre', 'direccion'])

    const punto = await Punto.create(datos)

    return response.created(punto)
  }
}