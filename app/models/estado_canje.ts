import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Canje from './canje.js'

export default class EstadoCanje extends BaseModel {
  public static table = 'estados_canjes'

  @column({ isPrimary: true })
  declare idEstadoCanje: number

  @column()
  declare nombre: string

  @hasMany(() => Canje, { foreignKey: 'idEstadoCanje' })
  declare canjes: HasMany<typeof Canje>
}
