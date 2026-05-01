import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Recompensa from './recompensa.js'

export default class TipoRecompensa extends BaseModel {
  public static table = 'tipos_recompensa'

  @column({ isPrimary: true })
  declare idTipoRecompensa: number

  @column()
  declare nombre: string

  @column()
  declare descripcion: string | null

  @hasMany(() => Recompensa, { foreignKey: 'idTipoRecompensa' })
  declare recompensas: HasMany<typeof Recompensa>
}
