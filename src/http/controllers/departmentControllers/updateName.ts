import { z } from 'zod'
import { DepartmentAlreadyExistsError } from '@/domain/Erros/department-already-exist-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpdateName } from '@/http/factories/department/makeUpdateName'

export async function updateName(request: FastifyRequest, reply: FastifyReply) {
  try {
    const updateNameBodySchema = z.object({
      id: z.number(),
      name: z.string(),
    })

    const { id, name } = updateNameBodySchema.parse(request.body)

    const updateDepartmentNameUseCase = makeUpdateName()

    await updateDepartmentNameUseCase.save({
      id,
      newName: name,
      userId: request.user.sub,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof DepartmentAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }

    if (error instanceof z.ZodError) {
      return reply.status(400).send({ message: JSON.parse(error.message) })
    }

    console.log(error)
    return reply.status(400).send('Internal Error')
  }
}
