import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Entrega from './entrega.js'
import Material from './material.js'

export default class DetalleEntrega extends BaseModel {
  public static table = 'detalle_entregas'

  @column({ isPrimary: true })
  declare idDetalle: number

  @column()
  declare idEntrega: number

  @column()
  declare idMaterial: number

  @column()
  declare peso: number

  @column()
  declare puntosGenerados: number

  @belongsTo(() => Entrega, { foreignKey: 'idEntrega' })
  declare entrega: BelongsTo<typeof Entrega>

  @belongsTo(() => Material, { foreignKey: 'idMaterial' })
  declare material: BelongsTo<typeof Material>
}
