import { Meal } from '../Entities/Meal'
import { AlreadyMealError } from '../Erros'
import { EmployeeInactiveError } from '../Erros/employee-inactive-error'
import { EmployeeNotFoundError } from '../Erros/employee-not-found-error.ts'
import { EmployeeRepository, MealRepository } from '../Repositories'

type InputCreateMeal = {
  employeeId: number
  userId: string
}

export class CreateMealUseCase {
  constructor(
    private readonly mealRepository: MealRepository,
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async save({ employeeId, userId }: InputCreateMeal) {
    const employee = await this.employeeRepository.findById(employeeId)

    if (!employee) {
      throw new EmployeeNotFoundError()
    }

    if (employee.inactivatedAt) {
      throw new EmployeeInactiveError()
    }

    const alreadyMeal = await this.mealRepository.alreadyMeal(employeeId)

    if (alreadyMeal) {
      throw new AlreadyMealError()
    }

    const maxId = await this.mealRepository.maxId()

    const meal = new Meal({
      id: maxId,
      employeeId,
      userId,
      dateTime: new Date(),
    })

    await this.mealRepository.create(meal)

    return meal.getProps()
  }
}
