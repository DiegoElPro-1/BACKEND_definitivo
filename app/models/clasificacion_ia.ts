import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Usuario from './usuario.js'
import Material from './material.js'
import Entrega from './entrega.js'

export default class ClasificacionIa extends BaseModel {
  public static table = 'clasificaciones_ia'

  @column({ isPrimary: true })
  declare idClasificacion: number

  @column()
  declare idUsuario: number

  @column()
  declare idMaterial: number

  @column()
  declare idEntrega: number | null

  @column()
  declare imagen: string | null

  @column()
  declare confianza: number | null

  @column()
  declare canecaRecomendada: string | null

  @column()
  declare recomendacion: string | null

  @column.dateTime()
  declare fechaClasificacion: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Usuario, { foreignKey: 'idUsuario' })
  declare usuario: BelongsTo<typeof Usuario>

  @belongsTo(() => Material, { foreignKey: 'idMaterial' })
  declare material: BelongsTo<typeof Material>

  @belongsTo(() => Entrega, { foreignKey: 'idEntrega' })
  declare entrega: BelongsTo<typeof Entrega>
}
