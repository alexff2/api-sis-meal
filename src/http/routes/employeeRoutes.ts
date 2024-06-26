import { FastifyInstance } from 'fastify'
import {
  create,
  updateName,
  updateDepartment,
  inactiveEmployee,
  find,
} from '@/http/controllers/employeeControllers'
import { verifyJwt } from '@/http/middlewares/verifyJwt'

export async function employeeRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/employee', create)
  app.get('/employee', find)
  app.put('/employee/name', updateName)
  app.put('/employee/department', updateDepartment)
  app.put('/employee/inactive', inactiveEmployee)
}
