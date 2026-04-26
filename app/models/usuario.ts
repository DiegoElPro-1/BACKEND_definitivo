import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Usuario extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre_completo: string

  @column()
  declare correo: string

  @column()
  declare rol: string

  @column()
  declare esta_activo: boolean

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}