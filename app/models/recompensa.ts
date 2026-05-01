import { BaseModel, column, belongsTo, hasOne, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo, HasOne, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import TipoRecompensa from './tipo_recompensa.js'
import Aliado from './aliado.js'
import EstadoRecompensa from './estado_recompensa.js'
import RecompensaDetalle from './recompensa_detalle.js'
import Material from './material.js'
import Canje from './canje.js'

export default class Recompensa extends BaseModel {
  public static table = 'recompensas'

  @column({ isPrimary: true })
  declare idRecompensa: number

  @column()
  declare idTipoRecompensa: number

  @column()
  declare idAliado: number | null

  @column()
  declare idEstadoRecompensa: number

  @column()
  declare nombre: string

  @column()
  declare descripcion: string | null

  @column()
  declare puntosRequeridos: number

  @column()
  declare fechaInicio: string | null

  @column()
  declare fechaFin: string | null

  @column()
  declare stock: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => TipoRecompensa, { foreignKey: 'idTipoRecompensa' })
  declare tipoRecompensa: BelongsTo<typeof TipoRecompensa>

  @belongsTo(() => Aliado, { foreignKey: 'idAliado' })
  declare aliado: BelongsTo<typeof Aliado>

  @belongsTo(() => EstadoRecompensa, { foreignKey: 'idEstadoRecompensa' })
  declare estadoRecompensa: BelongsTo<typeof EstadoRecompensa>

  @hasOne(() => RecompensaDetalle, { foreignKey: 'idRecompensa' })
  declare detalle: HasOne<typeof RecompensaDetalle>

  @hasMany(() => Canje, { foreignKey: 'idRecompensa' })
  declare canjes: HasMany<typeof Canje>

  @manyToMany(() => Material, {
    pivotTable: 'recompensa_material',
    localKey: 'idRecompensa',
    pivotForeignKey: 'id_recompensa',
    relatedKey: 'idMaterial',
    pivotRelatedForeignKey: 'id_material',
  })
  declare materiales: ManyToMany<typeof Material>
}
