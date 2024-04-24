import { makeCreateUser } from '@/http/factories/users/makeCreateUser'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { name, email, password } = createBodySchema.parse(request.body)

    const createUserUseCase = makeCreateUser()

    await createUserUseCase.execute({
      name,
      email,
      password,
      userIdCreate: request.user.sub,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply.status(400).send({
        message: JSON.parse(err.message),
      })
    }

    throw err
  }
}
