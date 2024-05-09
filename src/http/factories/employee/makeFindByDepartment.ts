import { ListEmployeesByDepartmentUseCase } from '@/domain/UseCases'
import { EmployeePrismaRepository } from '@/http/Repositories/Employee'

export function makeFindByDepartment() {
  const employeePrismaRepository = new EmployeePrismaRepository()
  const listEmployeesByDepartmentUseCase = new ListEmployeesByDepartmentUseCase(
    employeePrismaRepository,
  )

  return listEmployeesByDepartmentUseCase
}
