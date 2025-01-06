import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'consumptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('gr_consumption_consumerId').unsigned().references('users.gr_user_id').onDelete('CASCADE')
      table.integer('gr_consumption_consumableId').unsigned().references('consumables.gr_consumable_id').onDelete('CASCADE')
      table.float('gr_consumption_quantity').notNullable().defaultTo(1)
      table.date('gr_consumption_date').notNullable()
      table.enum('gr_consumption_mealType', ['breakfast', 'lunch', 'dinner', 'snack']).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}