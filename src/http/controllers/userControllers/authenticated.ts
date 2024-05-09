import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { InvalidCredentialsError } from '@/domain/Erros/Invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/http/factories/users/makeAuthenticate'

export async function authenticated(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(3),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({ user, token })
  } catch (err) {
    if (err instanceof z.ZodError || err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message:
          err instanceof z.ZodError
            ? { message: 'Credentials invalid' }
            : err.message,
      })
    }

    throw err
  }
}
