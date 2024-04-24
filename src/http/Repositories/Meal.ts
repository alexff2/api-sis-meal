import { Meal } from '@/domain/Entities'
import { MealRepository } from '@/domain/Repositories'
import { prisma } from '../lib/prisma'

export class MealPrismaRepository implements MealRepository {
  async alreadyMeal(employeeId: number) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate())
    startDate.setHours(0)
    startDate.setMinutes(0)
    startDate.setSeconds(0)
    startDate.setMilliseconds(0)

    const endDate = new Date(startDate)
    endDate.setHours(23)
    endDate.setMinutes(59)
    endDate.setSeconds(59)

    const meal = await prisma.meal.findFirst({
      select: {
        id: true,
        dateTime: true,
      },
      where: {
        employeeId,
        dateTime: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
      },
    })

    if (!meal) {
      return false
    }

    return true
  }

  async maxId() {
    const { _max } = await prisma.meal.aggregate({
      _max: {
        id: true,
      },
    })

    if (_max.id) {
      return Number(_max.id) + 1
    }

    return 1
  }

  async findById(id: number) {
    const meal = await prisma.meal.findUnique({ where: { id } })

    if (!meal) {
      return null
    }

    return new Meal(meal)
  }

  async create(meal: Meal) {
    await prisma.meal.create({ data: meal.getProps() })
  }
}
