import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Recompensa from './recompensa.js'

export default class EstadoRecompensa extends BaseModel {
  public static table = 'estados_recompensas'

  @column({ isPrimary: true })
  declare idEstadoRecompensa: number

  @column()
  declare nombre: string

  @hasMany(() => Recompensa, { foreignKey: 'idEstadoRecompensa' })
  declare recompensas: HasMany<typeof Recompensa>
}
