import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Aliado from './aliado.js'

export default class EstadoAliado extends BaseModel {
  public static table = 'estados_aliados'

  @column({ isPrimary: true })
  declare idEstadoAliado: number

  @column()
  declare nombre: string

  @hasMany(() => Aliado, { foreignKey: 'idEstadoAliado' })
  declare aliados: HasMany<typeof Aliado>
}
