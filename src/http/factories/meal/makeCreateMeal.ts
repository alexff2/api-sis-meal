import { CreateMealUseCase } from '@/domain/UseCases'
import { EmployeePrismaRepository } from '@/http/Repositories/Employee'
import { MealPrismaRepository } from '@/http/Repositories/Meal'

export function makeCreateMeal() {
  const mealRepository = new MealPrismaRepository()
  const employeeRepository = new EmployeePrismaRepository()
  const createMealUseCase = new CreateMealUseCase(
    mealRepository,
    employeeRepository,
  )

  return createMealUseCase
}
