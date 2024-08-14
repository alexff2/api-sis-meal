import {
  AlreadyMealError,
  EmployeeNotFoundError,
  EmployeeInactiveError,
} from '@/domain/Erros'
import { makeFindDepartmentById } from '@/http/factories/department/makeFindById'
import { makeFindById } from '@/http/factories/employee/makeFindById'
import { makeCreateMeal } from '@/http/factories/meal/makeCreateMeal'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createMealBodySchema = z.object({
      employeeId: z.number(),
    })

    const { employeeId } = createMealBodySchema.parse(request.body)

    const createMealUseCase = makeCreateMeal()

    const mealCreate = await createMealUseCase.save({
      employeeId,
      userId: request.user.sub,
    })

    const findEmployeeById = makeFindById()
    const listDepartmentById = makeFindDepartmentById()

    const employeeMeal = await findEmployeeById.execute(mealCreate.employeeId)

    if (!employeeMeal) {
      return reply.status(400).send()
    }

    const department = await listDepartmentById.execute(
      employeeMeal.departmentId,
    )

    return reply.status(201).send({
      ...employeeMeal,
      department: department?.name,
    })
  } catch (error) {
    if (
      error instanceof EmployeeNotFoundError ||
      error instanceof AlreadyMealError ||
      error instanceof EmployeeInactiveError
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
