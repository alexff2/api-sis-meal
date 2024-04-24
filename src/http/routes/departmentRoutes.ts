import { FastifyInstance } from 'fastify'
import { create, updateName } from '@/http/controllers/departmentControllers'
import { verifyJwt } from '@/http/middlewares/verifyJwt'

export async function departmentRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/department', create)
  app.put('/department', updateName)
}
