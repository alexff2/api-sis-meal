import { ListEmployeesByIdUseCase } from '@/domain/UseCases'
import { EmployeePrismaRepository } from '@/http/Repositories/Employee'

export function makeFindById() {
  const employeePrismaRepository = new EmployeePrismaRepository()
  const listEmployeesByIdUseCase = new ListEmployeesByIdUseCase(
    employeePrismaRepository,
  )

  return listEmployeesByIdUseCase
}
