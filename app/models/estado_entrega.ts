import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Entrega from './entrega.js'

export default class EstadoEntrega extends BaseModel {
  public static table = 'estados_entregas'

  @column({ isPrimary: true })
  declare idEstadoEntrega: number

  @column()
  declare nombre: string

  @hasMany(() => Entrega, { foreignKey: 'idEstadoEntrega' })
  declare entregas: HasMany<typeof Entrega>
}
