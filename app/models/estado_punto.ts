import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import PuntoRecolaje from './punto_reciclaje.js'

export default class EstadoPunto extends BaseModel {
  public static table = 'estados_puntos'

  @column({ isPrimary: true })
  declare idEstadoPunto: number

  @column()
  declare nombre: string

  @hasMany(() => PuntoReciclaje, { foreignKey: 'idEstadoPunto' })
  declare puntosReciclaje: HasMany<typeof PuntoReciclaje>
}
