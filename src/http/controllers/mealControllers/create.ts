import { AlreadyMealError } from '@/domain/Erros'
import { EmployeeInactiveError } from '@/domain/Erros/employee-inactive-error'
import { EmployeeNotFoundError } from '@/domain/Erros/employee-not-found-error.ts'
import { makeCreateMeal } from '@/http/factories/meal/makeCreateMeal'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createMealController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const createMealBodySchema = z.object({
      employeeId: z.number(),
    })

    const { employeeId } = createMealBodySchema.parse(request.body)

    const createMealUseCase = makeCreateMeal()

    await createMealUseCase.save({
      employeeId,
      userId: request.user.sub,
    })

    return reply.status(201).send()
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
