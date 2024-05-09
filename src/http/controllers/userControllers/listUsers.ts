import { makeListUsers } from '@/http/factories/users/makeListUsers'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const listUserUseCase = makeListUsers()

    const users = await listUserUseCase.execute()

    return reply.status(200).send(users)
  } catch (error) {
    console.log(error)
  }
}
