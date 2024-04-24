import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import cors from '@fastify/cors'

import {
  usersRoutes,
  departmentRoutes,
  employeeRoutes,
  mealRoutes,
} from './routes'

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
})

app.register(cors, {})

app.register(fastifyJwt, {
  secret: process.env.KEY_SECRET ?? 'dev',
})

app.register(usersRoutes)
app.register(departmentRoutes)
app.register(employeeRoutes)
app.register(mealRoutes)

app.listen({
  host: '0.0.0.0',
  port: 3333,
})
