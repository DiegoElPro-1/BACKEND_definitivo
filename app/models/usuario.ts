import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

export default class Usuario extends BaseModel {
  // Obligamos a que la tabla se llame 'usuarios' en la DB
  public static table = 'usuarios'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre_completo: string

  @column()
  declare correo_electronico: string

  @column({ serializeAs: null }) 
  declare password: string

  @column()
  declare rol: 'administrador' | 'supermercado' | 'usuario'

  @column()
  declare esta_activo: boolean

  @column()
  declare puntos_acumulados: number

  @column.dateTime({ autoCreate: true, columnName: 'fecha_creacion' })
  declare fechaCreacion: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'fecha_actualizacion' })
  declare fechaActualizacion: DateTime

  // Relación para los tokens de seguridad (OAT)
  static accessTokens = DbAccessTokensProvider.forModel(Usuario)
}