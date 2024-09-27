import { BaseModel } from "@adonisjs/lucid/orm";
import { CustomNamingStrategy } from "../app/naming_strategy/custom_naming_strategy.js";

BaseModel.namingStrategy = new CustomNamingStrategy();