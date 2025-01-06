import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Consumable from './consumable.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['id', 'email', 'tokenId'],
  passwordColumnName: 'password',
});

export default class User extends compose(BaseModel, AuthFinder) {

  static selfAssignPrimaryKey = true;

  @column({ isPrimary: true, serializeAs: null })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare email: string;

  @column()
  declare tokenId: string;

  @column({ serializeAs: null })
  declare password: string;

  @column()
  declare gender: string;

  @column()
  declare level: number;

  @column()
  declare xp: number;

  @column()
  declare lang: string;

  @column()
  declare avatar: string;

  @column.dateTime({ autoCreate: true,  serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true,  serializeAs: null })
  declare updatedAt: DateTime;

  @hasMany(() => Consumable, {
    foreignKey: 'authorId', // clé étrangère dans le modèle Consumable
  })
  declare consumablesCreated: HasMany<typeof Consumable>;

  @manyToMany(() => Consumable, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'gr_consumption_consumerId',
    pivotRelatedForeignKey: 'gr_consumption_consumableId',
    pivotTable: 'consumptions',
    pivotColumns: ['gr_consumption_date', 'gr_consumption_quantity', 'gr_consumption_mealType']
  })
  declare consumed: ManyToMany<typeof Consumable>;

  @beforeCreate()
  static async assignTokenId(user: User) {
    user.tokenId = await hash.use('scrypt').make(user.id+"bannana breadss");
  }

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '60 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  });
}