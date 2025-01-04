import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recipeCompositions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('gr_recipeComposition_recipeId').unsigned().references('consumables.gr_consumable_id').onDelete('CASCADE')
      table.integer('gr_recipeComposition_componentId').unsigned().references('consumables.gr_consumable_id').onDelete('CASCADE')
      table.float('gr_recipeComposition_quantity').notNullable().defaultTo(1)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}