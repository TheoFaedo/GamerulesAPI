import { BaseModel, CamelCaseNamingStrategy } from "@adonisjs/lucid/orm";

export class CustomNamingStrategy extends CamelCaseNamingStrategy {
    columnName(_model: typeof BaseModel, propertyName: string) {
        return 'gr_' + _model.name.toLowerCase() + '_' + propertyName;
    }
}