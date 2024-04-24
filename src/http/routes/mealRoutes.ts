import { FastifyInstance } from 'fastify'
import { createMealController } from '@/http/controllers/mealControllers'
import { verifyJwt } from '@/http/middlewares/verifyJwt'

export async function mealRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/meal', createMealController)
}
