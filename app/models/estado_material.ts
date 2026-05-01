import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Material from './material.js'

export default class EstadoMaterial extends BaseModel {
  public static table = 'estados_materiales'

  @column({ isPrimary: true })
  declare idEstadoMaterial: number

  @column()
  declare nombre: string

  @hasMany(() => Material, { foreignKey: 'idEstadoMaterial' })
  declare materiales: HasMany<typeof Material>
}
