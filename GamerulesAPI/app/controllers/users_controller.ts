import Consumable from '#models/consumable';
import User from '#models/user';
import { consumedValidator, consumeValidator, loginUserValidator, registerUserValidator } from '#validators/user';
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {

    public async login({ request, response }: HttpContext) {
        const data = request.only(['email', 'password']);
        const payload = await loginUserValidator.validate(data);

        const user = await User.verifyCredentials(payload.email, payload.password);
        const token = await User.accessTokens.create(user);

        return response.ok({ user, token });
    }

    public async register({ request, response }: HttpContext) {
        const data = request.only(['email', 'password', 'name', 'gender']);
        const payload = await registerUserValidator.validate(data);

        if(await User.findBy('email', payload.email)) {
            return response.status(409).json({ message: 'User already exists' });
        }

        try {
            await User.create(payload);
        } catch(error) {
            return response.status(500).json({ message: 'Something went wrong' });
        }
        

        return response.created();
    }

    public async logout({ auth, response }: HttpContext) {
        const user = await auth.authenticate();

        if(!user){
            return response.notFound();
        }

        await User.accessTokens.delete(user, user.currentAccessToken.identifier);

        return response.status(204);
    }

    public async me({ auth, response }: HttpContext) {
        const user = await auth.authenticate();

        if(!user){
            return response.unauthorized();
        }

        return response.ok(user);
    }

    public async consume({ auth, request, response }: HttpContext) {
        const user = await auth.authenticate();

        if(!user){
            return response.unauthorized();
        }

        const data = request.only(['mealId', 'quantity', 'mealType', 'date']);
        const payload = await consumeValidator.validate(data);

        const consumable = await Consumable.findOrFail(payload.mealId);

        await user.related('consumed').attach({
            [consumable.id]: {
                gr_consumption_quantity: payload.quantity,
                gr_consumption_mealType: payload.mealType,
                gr_consumption_date: payload.date
            }
        });

        return response.created();
    }

    public async consumed({ auth, request, response }: HttpContext) {
        const user = await auth.authenticate();

        if(!user){
            return response.unauthorized();
        }

        const data = request.only(['date']);
        const payload = await consumedValidator.validate(data);

        if(payload.date){
            await user.load('consumed', (query) => {
                query.where('gr_consumption_date', payload.date);
            });
        }else{
            await user.load('consumed', (query) => {
                query.where('gr_consumption_date', new Date().toISOString().split('T')[0]);
            });
        }
        
        console.log(new Date().toISOString());

        // Class by meal types
        const meals = user.consumed.reduce((acc: any, meal: any) => {
            if(!acc[meal.$extras.pivot_gr_consumption_mealType]){
                acc[meal.$extras.pivot_gr_consumption_mealType] = [];
            }
            acc[meal.$extras.pivot_gr_consumption_mealType].push(meal);
            return acc;
        }, {});

        return response.ok(meals);
    }
}