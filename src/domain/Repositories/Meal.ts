import { Meal } from '../Entities'

export interface MealRepository {
  findById: (id: number) => Promise<Meal | null>
  create: (meal: Meal) => Promise<void>
  maxId: () => Promise<number>
  alreadyMeal: (employeeId: number) => Promise<boolean>
}
