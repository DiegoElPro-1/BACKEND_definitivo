import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Usuario extends BaseModel {
 @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string  // <--- Esta es la que te falta

  @column()
  declare correo: string

  @column()
  declare password: string

  @column()
  declare rol: string

  @column()
  declare telefono: string

  @column()
  declare esta_activo: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}