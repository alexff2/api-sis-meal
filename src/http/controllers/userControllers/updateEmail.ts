import { makeUpdateUserEmail } from '@/http/factories/users/makeUpdateUserEmail'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function updateEmail(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const updateEmailBodySchema = z.object({
      newEmail: z.string().email(),
      oldEmail: z.string().email(),
    })

    const { newEmail, oldEmail } = updateEmailBodySchema.parse(request.body)

    const updateUserEmailUseCase = makeUpdateUserEmail()

    await updateUserEmailUseCase.execute({
      newEmail,
      oldEmail,
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
