import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()

    const userId = request.user.sub

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      throw new Error('Deleted user token')
    }
  } catch (err) {
    console.log(err)

    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
