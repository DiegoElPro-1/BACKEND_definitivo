import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Aliado extends BaseModel {
  @column({ isPrimary: true })
 
  declare id: number

  @column()
  declare nombreNegocio: string

  @column()
  declare correo: string

  @column()
  declare password: string

  @column()
  declare rol: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}