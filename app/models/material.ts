import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import EstadoMaterial from './estado_material.js'

export default class Material extends BaseModel {
  public static table = 'materiales'

  @column({ isPrimary: true })
  declare idMaterial: number

  @column()
  declare idEstadoMaterial: number

  @column()
  declare nombre: string

  @column()
  declare descripcion: string | null

  @column()
  declare tipoResiduo: string | null

  @column()
  declare colorCaneca: string | null

  @column()
  declare indicacionDisposicion: string | null

  @column()
  declare puntosPorKg: number

  @column()
  declare imagen: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => EstadoMaterial, { foreignKey: 'idEstadoMaterial' })
  declare estadoMaterial: BelongsTo<typeof EstadoMaterial>
}
