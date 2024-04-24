import { makeUpdateUserName } from '@/http/factories/users/makeUpdateUserName'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function updateName(request: FastifyRequest, reply: FastifyReply) {
  try {
    const updateNameBodySchema = z.object({
      email: z.string(),
      newName: z.string(),
    })

    const { email, newName } = updateNameBodySchema.parse(request.body)

    const updateUserNameUseCase = makeUpdateUserName()

    await updateUserNameUseCase.execute({
      newName,
      email,
      userId: request.user.sub,
    })

    return reply.status(200).send()
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply.status(400).send({
        message: JSON.parse(err.message),
      })
    }

    throw err
  }
}
