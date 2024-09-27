import User from '#models/user';
import { loginUserValidator, registerUserValidator } from '#validators/user';
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
}