import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('gr_user_id');
      table.string('gr_user_name', 14).notNullable();
      table.string('gr_user_email', 64).notNullable().unique();
      table.text('gr_user_tokenId').notNullable().unique();
      table.text('gr_user_password').notNullable();
      table.enum('gr_user_gender', ['M', 'F']).notNullable().defaultTo('M');
      table.integer('gr_user_level', 5).notNullable().defaultTo(1);
      table.integer('gr_user_xp', 11).notNullable().defaultTo(0);
      table.enum('gr_user_lang', ['fr', 'en']).notNullable().defaultTo('fr');
      table.string('gr_user_avatar', 64).nullable().defaultTo(null);
      table.timestamp('gr_user_createdAt').notNullable();
      table.timestamp('gr_user_updatedAt').notNullable();
    })
  }


  async down() {
    this.schema.dropTable(this.tableName)
  }
}