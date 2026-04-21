import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nombre_completo').notNullable()
      table.string('correo_electronico').notNullable().unique()
      table.string('contrasena').notNullable()
      table.enum('rol', ['administrador', 'supermercado', 'usuario']).defaultTo('usuario')
      table.boolean('esta_activo').defaultTo(true) // Requerimiento Especial
      table.integer('puntos_acumulados').defaultTo(0)
      table.timestamp('fecha_creacion')
      table.timestamp('fecha_actualizacion')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}