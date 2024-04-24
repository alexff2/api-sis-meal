import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCheckIsFirstUser } from '@/http/factories/users/makeCheckIsFirstUser'

export async function verifyEmpty(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const checkIsFirstUserUseCase = makeCheckIsFirstUser()

    await checkIsFirstUserUseCase.execute()

    return reply.status(200).send()
  } catch (err) {
    return reply.status(400).send({ err })
  }
}
