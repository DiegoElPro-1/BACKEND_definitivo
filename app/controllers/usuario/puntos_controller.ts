import type { HttpContext } from '@adonisjs/core/http'
import MovimientoPunto from '#models/movimiento_punto'
import Entrega from '#models/entrega'

export default class PuntosController {
  async resumen({ auth, response }: HttpContext) {
    const movimientos = await MovimientoPunto.query()
      .where('id_usuario', auth.user!.idUsuario)
      .orderBy('fecha_movimiento', 'desc')

    const ganados = movimientos
      .filter((m) => m.tipoMovimiento === 'ganados')
      .reduce((sum, m) => sum + m.puntos, 0)

    const descontados = movimientos
      .filter((m) => m.tipoMovimiento === 'descontados')
      .reduce((sum, m) => sum + m.puntos, 0)

    const ajuste = movimientos
      .filter((m) => m.tipoMovimiento === 'ajuste')
      .reduce((sum, m) => sum + m.puntos, 0)

    const saldo = ganados - descontados + ajuste

    return response.ok({
      saldo,
      ganados,
      descontados,
      movimientos,
    })
  }

  async historial({ auth, response }: HttpContext) {
    const movimientos = await MovimientoPunto.query()
      .where('id_usuario', auth.user!.idUsuario)
      .preload('entrega')
      .orderBy('fecha_movimiento', 'desc')

    return response.ok({ movimientos })
  }
}