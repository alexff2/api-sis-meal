import { DepartmentAlreadyExistsError } from '@/domain/Erros/department-already-exist-error'
import { makeCreate } from '@/http/factories/department/makeCreate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createDepartmentBodySchema = z.object({
      name: z.string(),
    })

    const { name } = createDepartmentBodySchema.parse(request.body)

    const createDepartmentUseCase = makeCreate()

    const department = await createDepartmentUseCase.save({
      name,
      userId: request.user.sub,
    })

    return reply.status(201).send(department)
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
