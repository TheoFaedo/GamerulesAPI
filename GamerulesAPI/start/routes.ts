/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import ConsumablesController from '#controllers/consumables_controller';
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

/**
 * Consumables routes
 */

router.get('/consumables', [ConsumablesController, 'allConsumables']);

router.post('/consumables/meal', [ConsumablesController, 'createMeal']);

router.post('/consumables/fast', [ConsumablesController, 'createFast']);

router.post('/consumables/recipe', [ConsumablesController, 'createRecipe']);