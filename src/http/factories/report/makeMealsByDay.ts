import { ReportMealsByDayUseCase } from '@/domain/UseCases'
import { EmployeePrismaRepository } from '@/http/Repositories/Employee'
import { DepartmentPrimsRepository } from '@/http/Repositories/Department'
import { MealPrismaRepository } from '@/http/Repositories/Meal'

export function makeMealsByDay() {
  const MealRepository = new MealPrismaRepository()
  const EmployeeRepository = new EmployeePrismaRepository()
  const DepartmentRepository = new DepartmentPrimsRepository()

  const makeReportMealsByDayUseCase = new ReportMealsByDayUseCase(
    MealRepository,
    EmployeeRepository,
    DepartmentRepository,
  )

  return makeReportMealsByDayUseCase
}
