import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Usuario from './usuario.js'
import PuntoReciclaje from './punto_reciclaje.js'
import EstadoEntrega from './estado_entrega.js'
import DetalleEntrega from './detalle_entrega.js'
import ClasificacionIa from './clasificacion_ia.js'
import MovimientoPunto from './movimiento_punto.js'

export default class Entrega extends BaseModel {
  public static table = 'entregas'

  @column({ isPrimary: true })
  declare idEntrega: number

  @column()
  declare idUsuario: number

  @column()
  declare idPunto: number

  @column()
  declare idEstadoEntrega: number

  @column.dateTime()
  declare fechaEntrega: DateTime

  @column()
  declare pesoTotal: number

  @column()
  declare puntosTotales: number

  @column()
  declare observacion: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Usuario, { foreignKey: 'idUsuario' })
  declare usuario: BelongsTo<typeof Usuario>

  @belongsTo(() => PuntoReciclaje, { foreignKey: 'idPunto' })
  declare puntoReciclaje: BelongsTo<typeof PuntoReciclaje>

  @belongsTo(() => EstadoEntrega, { foreignKey: 'idEstadoEntrega' })
  declare estadoEntrega: BelongsTo<typeof EstadoEntrega>

  @hasMany(() => DetalleEntrega, { foreignKey: 'idEntrega' })
  declare detalles: HasMany<typeof DetalleEntrega>

  @hasMany(() => ClasificacionIa, { foreignKey: 'idEntrega' })
  declare clasificaciones: HasMany<typeof ClasificacionIa>

  @hasMany(() => MovimientoPunto, { foreignKey: 'idEntrega' })
  declare movimientos: HasMany<typeof MovimientoPunto>
}
