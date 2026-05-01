import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'api_tokens'
  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('abilities').notNullable().defaultTo('["*"]').after('type')
    })
  }
  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('abilities')
    })
  }
}
