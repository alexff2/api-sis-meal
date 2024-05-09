import { FastifyInstance } from 'fastify'
import { create } from '@/http/controllers/mealControllers'
import { verifyJwt } from '@/http/middlewares/verifyJwt'

export async function mealRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/meal', create)
}
