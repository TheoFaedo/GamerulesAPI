import Consumable from '#models/consumable';
import { createFastValidator, createMealValidator, createRecipeValidator } from '#validators/consumable';
import type { HttpContext } from '@adonisjs/core/http'

type Component = {
    id: number;
    quantity: number;
}

export default class ConsumablesController {

    public async allConsumables({ auth, response }: HttpContext){

        const user = await auth.authenticate();
        if(!user) return response.unauthorized();

        const consumablesQuery = Consumable.query().select("*");

        consumablesQuery.whereIn('type', ['recipe', 'meal']).where('authorId', user.id).orWhere('isPublic', true);

        const consumables = await consumablesQuery.preload('components',  (query) => {
            query.pivotColumns(['gr_recipeComposition_quantity']);
        }).exec();

        return consumables.map(consumable => {
            if(consumable.type === 'recipe'){
                const components = consumable.components.map((component: any) => {
                    return {consumable: component.toJSON(), quantity: component.$extras.pivot_gr_recipeComposition_quantity};
                });
                return {
                    ...consumable.toJSON(),
                    components
                }
            }
            return consumable;
        });
    }

    public async createMeal({ auth, request, response }: HttpContext) {

        const user = await auth.authenticate();
        if(!user) return response.unauthorized();

        const data = request.only(['energy', 'carbohydrates', 'fats', 'proteins',  'name', 'serving_size', 'isPublic']);
        const payload = await createMealValidator.validate(data);

        const consumable = new Consumable();

        consumable.type = 'meal';
        Object.assign(consumable, payload);
        consumable.authorId = user.id;

        await consumable.save();

        return response.created();
    }

    public async createFast({ auth, request, response }: HttpContext) {

        const user = await auth.authenticate();
        if(!user) return response.unauthorized();

        const data = request.only(['energy', 'carbohydrates', 'fats', 'proteins']);
        const payload = await createFastValidator.validate(data);

        const consumable = new Consumable();

        await consumable.fill({
            ...payload,
            type: 'fast',
            authorId: user.id
        }).save();

        return response.created();
    }

    public async createRecipe({ auth, request, response }: HttpContext) {
        
        const user = await auth.authenticate();
        if(!user) return response.unauthorized();

        const data = request.only(['energy', 'carbohydrates', 'fats', 'proteins', 'name', 'serving_size', 'components', 'isPublic']);
        const payload = await createRecipeValidator.validate(data);

        const consumable = new Consumable();

        const  {  components, ...payloadWithoutComponents } = payload;

        await consumable.fill({
            ...payloadWithoutComponents,
            type: 'recipe',
            authorId: user.id
        }).save();

        // Restructure components array to match the pivot table schema (remove duplicates and sum quantities)
        const componentsIdsRestructured = payload.components.reduce((acc: { [key: number]: { gr_recipeComposition_quantity: number } }, component: Component) => {
            if(!acc[component.id]) acc[component.id] = { gr_recipeComposition_quantity:  component.quantity };
            else acc[component.id].gr_recipeComposition_quantity += component.quantity;
            return acc;
        }, {});

        // Create the relationship between the consumable and its components
        await consumable.related('components').attach(componentsIdsRestructured);

        return response.created();
    }

}