import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'consumables'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('gr_consumable_id')

      table.float('gr_consumable_energy').notNullable()
      table.float('gr_consumable_carbohydrates').notNullable()
      table.float('gr_consumable_fats').notNullable()
      table.float('gr_consumable_proteins').notNullable()
      table.enum('gr_consumable_type', ['fast', 'meal', 'recipe']).notNullable()

      table.string('gr_consumable_name')
      table.string('gr_consumable_serving_size')
      table.boolean('gr_consumable_isPublic').defaultTo(false)

      table.timestamp('gr_consumable_createdAt')
      table.timestamp('gr_consumable_updatedAt')

      table.integer('gr_consumable_authorId').unsigned().references('users.gr_user_id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}