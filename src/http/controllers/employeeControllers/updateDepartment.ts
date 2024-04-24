import { DepartmentNotFoundError, EmployeeNotFoundError } from '@/domain/Erros'
import { makeUpdateDepartment } from '@/http/factories/employee/makeUpdateDepartment'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateDepartment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const updateNameEmployeeBodySchema = z.object({
      id: z.number(),
      departmentId: z.number(),
    })

    const { id, departmentId } = updateNameEmployeeBodySchema.parse(
      request.body,
    )

    const updateEmployeeDepartmentUseCase = makeUpdateDepartment()

    await updateEmployeeDepartmentUseCase.save({
      id,
      userId: request.user.sub,
      departmentId,
    })

    return reply.status(200).send()
  } catch (error) {
    if (
      error instanceof EmployeeNotFoundError ||
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
