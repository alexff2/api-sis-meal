import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MealsNotFoundError } from '@/domain/Erros'

import { makeMealsByDay } from '@/http/factories/report/makeMealsByDay'

export async function reportMealsByDay(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const createMealBodySchema = z.object({
      month: z.string(),
      year: z.string(),
    })

    console.log(request.query)

    const { month, year } = createMealBodySchema.parse(request.query)
    const ReportMealsByDay = makeMealsByDay()

    const mealsByDay = await ReportMealsByDay.execute({
      month: Number(month),
      year: Number(year),
    })

    return reply.send({ mealsByDay })
  } catch (error) {
    if (error instanceof MealsNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    if (error instanceof z.ZodError) {
      return reply.status(400).send({ message: JSON.parse(error.message) })
    }

    console.log(error)
    return reply.status(400).send('Internal Error')
  }
}
