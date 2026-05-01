import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Usuario from './usuario.js'

export default class EstadoUsuario extends BaseModel {
  public static table = 'estados_usuarios'

  @column({ isPrimary: true })
  declare idEstadoUsuario: number

  @column()
  declare nombre: string

  @hasMany(() => Usuario, { foreignKey: 'idEstadoUsuario' })
  declare usuarios: HasMany<typeof Usuario>
}
