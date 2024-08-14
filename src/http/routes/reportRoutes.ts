import { FastifyInstance } from 'fastify'
import { reportMealsByDay } from '@/http/controllers/reportControllers'
import { verifyJwt } from '@/http/middlewares/verifyJwt'

export async function reportRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/report/meals/day', reportMealsByDay)
}
