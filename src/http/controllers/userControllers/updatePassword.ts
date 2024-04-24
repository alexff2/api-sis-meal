import { InvalidCredentialsError } from '@/domain/Erros/Invalid-credentials-error'
import { makeUpdateUserPassword } from '@/http/factories/users/makeUpdateUserPassword'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function updatePassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const updatePasswordBodySchema = z.object({
      email: z.string(),
      oldPassword: z.string(),
      password: z.string(),
    })

    const { email, oldPassword, password } = updatePasswordBodySchema.parse(
      request.body,
    )

    const updateUserPasswordUseCase = makeUpdateUserPassword()

    await updateUserPasswordUseCase.execute({
      oldPassword,
      password,
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

    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    throw err
  }
}
