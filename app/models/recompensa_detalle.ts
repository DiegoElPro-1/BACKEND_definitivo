import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Recompensa from './recompensa.js'

export default class RecompensaDetalle extends BaseModel {
  public static table = 'recompensa_detalle'

  @column({ isPrimary: true })
  declare idDetalleRecompensa: number

  @column()
  declare idRecompensa: number

  @column()
  declare valorPorcentaje: number | null

  @column()
  declare valorFijo: number | null

  @column()
  declare codigoCupon: string | null

  @column()
  declare productoDescripcion: string | null

  @column()
  declare condiciones: string | null

  @belongsTo(() => Recompensa, { foreignKey: 'idRecompensa' })
  declare recompensa: BelongsTo<typeof Recompensa>
}
