import { FastifyInstance } from 'fastify'
import {
  authenticated,
  verifyEmpty,
  create,
  updateName,
  updateEmail,
  updatePassword,
  listUsers,
} from '@/http/controllers/userControllers'
import { verifyJwt } from '@/http/middlewares/verifyJwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticated)

  app.post('/verifyEmpty', verifyEmpty)

  app.get('/user', { onRequest: [verifyJwt] }, listUsers)
  app.post('/user', { onRequest: [verifyJwt] }, create)
  app.put('/user/name', { onRequest: [verifyJwt] }, updateName)
  app.put('/user/email', { onRequest: [verifyJwt] }, updateEmail)
  app.put('/user/password', { onRequest: [verifyJwt] }, updatePassword)
}
