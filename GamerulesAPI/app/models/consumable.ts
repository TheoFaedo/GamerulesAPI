import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Consumable extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare energy: number

  @column()
  declare carbohydrates: number

  @column()
  declare fats: number

  @column()
  declare proteins: number

  @column()
  declare type: 'fast'|'meal'|'recipe'

  @column()
  declare name: string

  @column()
  declare serving_size: string

  @column()
  declare isPublic: boolean

  @column()
  declare authorId: number;

  @belongsTo(() => User, {
    foreignKey: 'authorId', // foreign key in the Consumable model
  })
  declare author: BelongsTo<typeof User>

  @manyToMany(() => Consumable, {
    pivotTable: 'recipeCompositions',
    localKey: 'id',
    pivotForeignKey: 'gr_recipeComposition_recipeId',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'gr_recipeComposition_componentId',
    pivotColumns: ['gr_recipeComposition_quantity']
  })
  declare components: ManyToMany<typeof Consumable>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}