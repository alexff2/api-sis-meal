import {
  EmployeeAlreadyInactiveError,
  EmployeeNotFoundError,
} from '@/domain/Erros'
import { makeInactive } from '@/http/factories/employee/makeInactive'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function inactiveEmployee(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const updateNameEmployeeBodySchema = z.object({
      id: z.number(),
    })

    const { id } = updateNameEmployeeBodySchema.parse(request.body)

    const inactiveEmployeeUseCase = makeInactive()

    inactiveEmployeeUseCase.execute({
      id,
      userId: request.user.sub,
    })

    return reply.status(200).send()
  } catch (error) {
    if (
      error instanceof EmployeeNotFoundError ||
      error instanceof EmployeeAlreadyInactiveError
    ) {
      return reply.status(400).send({ message: error.message })
    }

    if (error instanceof z.ZodError) {
      return reply.status(400).send({ message: JSON.parse(error.message) })
    }

    console.log(error)
    return reply.status(400).send('Internal Error')
  }
}
