import { Meal } from '../Entities'

export type PropsFindByDay = {
  startDate: Date
  endDate: Date
}

export interface MealRepository {
  findById: (id: number) => Promise<Meal | null>
  findByDate: (props: PropsFindByDay) => Promise<Meal[] | []>
  create: (meal: Meal) => Promise<void>
  maxId: () => Promise<number>
  alreadyMeal: (employeeId: number) => Promise<boolean>
}
