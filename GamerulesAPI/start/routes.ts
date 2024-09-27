/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import UsersController from '#controllers/users_controller';
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

/**
 * Users routes
 */

router.post('/login', [UsersController, 'login']);

router.post('/register', [UsersController, 'register']);

router.put('/logout', [UsersController, 'logout']);