import {
  EmployeeAlreadyExistsError,
  EmployeeNotFoundError,
} from '@/domain/Erros'
import { makeUpdateName } from '@/http/factories/employee/makeUpdateName'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateName(request: FastifyRequest, reply: FastifyReply) {
  try {
    const updateNameEmployeeBodySchema = z.object({
      name: z.string(),
      id: z.number(),
    })

    const { name, id } = updateNameEmployeeBodySchema.parse(request.body)

    const updateEmployeeNameUseCase = makeUpdateName()

    await updateEmployeeNameUseCase.save({
      id,
      newName: name,
      userId: request.user.sub,
    })

    return reply.status(200).send()
  } catch (error) {
    if (
      error instanceof EmployeeNotFoundError ||
      error instanceof EmployeeAlreadyExistsError
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
