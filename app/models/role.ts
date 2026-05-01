import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Usuario from './usuario.js'

export default class Role extends BaseModel {
  public static table = 'roles'

  @column({ isPrimary: true })
  declare idRol: number

  @column()
  declare nombre: string

  @column()
  declare descripcion: string | null

  @hasMany(() => Usuario, { foreignKey: 'idRol' })
  declare usuarios: HasMany<typeof Usuario>
}
