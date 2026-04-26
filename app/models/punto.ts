import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Punto extends BaseModel {
@column()
declare nombre: string

@column()
declare direccion: string
}