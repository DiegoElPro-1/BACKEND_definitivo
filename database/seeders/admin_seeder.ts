import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'

export default class AdminSeeder extends BaseSeeder {
  async run() {
    await Usuario.create({
      idRol: 1,           // admin
      idEstadoUsuario: 1, // activo
      nombre: 'Administrador',
      correo: 'admin@test.com',
      password: await hash.make('123456'),
      fechaRegistro: DateTime.now(),
    })

    console.log('Usuario admin creado: admin@test.com / 123456')
  }
}