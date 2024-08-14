import {
  DepartmentRepository,
  EmployeeRepository,
  MealRepository,
} from '@/domain/Repositories'
import { MealsNotFoundError } from '../Erros'
import { getStartEndOfMonth } from '../utils/dates'

type MealsByDayInput = {
  month: number
  year: number
}

type DepartmentQuantity = {
  id: number
  name: string
  quantity: number
}

type MealsByDayOutput = {
  date: string
  day: string
  quantityTotal: number
  valueUnit: number
  valueTotal: number
  quantityByDepartment: DepartmentQuantity[]
}

export class ReportMealsByDayUseCase {
  constructor(
    private readonly mealRepository: MealRepository,
    private readonly employeeRepository: EmployeeRepository,
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  async execute({ month, year }: MealsByDayInput) {
    const { startDate, endDate } = getStartEndOfMonth({ month, year })

    const meals = await this.mealRepository.findByDate({
      startDate,
      endDate,
    })

    if (meals.length === 0) {
      throw new MealsNotFoundError()
    }

    const employees = await this.employeeRepository.findAll()

    const departments = await this.departmentRepository.findAll()

    const mealsByDay: MealsByDayOutput[] = []
    const semana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
    const valueUnit = 14

    meals.forEach((meal) => {
      const mealsProps = {
        ...meal.getProps(),
        date: meal.getProps().dateTime.toLocaleDateString(),
      }

      employees.forEach((employee) => {
        if (meal.getIdEmployee() === employee.id) {
          let wasFoundDay = false
          mealsByDay.forEach((mealByDay) => {
            if (mealByDay.date === mealsProps.date) {
              wasFoundDay = true
              mealByDay.quantityTotal += 1
              mealByDay.valueTotal += mealByDay.valueUnit
              mealByDay.quantityByDepartment.forEach((quantityDepartment) => {
                if (employee.departmentId === quantityDepartment.id) {
                  quantityDepartment.quantity += 1
                }
              })
            }
          })
          if (!wasFoundDay) {
            mealsByDay.push({
              date: mealsProps.dateTime.toLocaleDateString(),
              day: semana[mealsProps.dateTime.getDay()],
              quantityTotal: 1,
              valueTotal: valueUnit,
              valueUnit,
              quantityByDepartment: departments.map((department) => {
                if (employee.departmentId === department.id) {
                  return {
                    id: department.id,
                    name: department.name,
                    quantity: 1,
                  }
                }

                return {
                  id: department.id,
                  name: department.name,
                  quantity: 0,
                }
              }),
            })
          }
        }
      })
    })

    return mealsByDay
  }
}
