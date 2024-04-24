import { DepartmentNotFoundError } from '@/domain/Erros/department-not-found-error.ts'
import { EmployeeAlreadyExistsError } from '@/domain/Erros/employee-already-exist-error'
import { makeCreate } from '@/http/factories/employee/makeCreate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createEmployeeBodySchema = z.object({
      name: z.string(),
      departmentId: z.number(),
    })

    const { name, departmentId } = createEmployeeBodySchema.parse(request.body)

    const createEmployeeUseCase = makeCreate()

    const employee = await createEmployeeUseCase.save({
      name,
      departmentId,
      userId: request.user.sub,
    })

    return reply.status(201).send(employee)
  } catch (error) {
    if (
      error instanceof EmployeeAlreadyExistsError ||
      error instanceof DepartmentNotFoundError
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
