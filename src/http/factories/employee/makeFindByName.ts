import { ListEmployeesByNameUseCase } from '@/domain/UseCases'
import { EmployeePrismaRepository } from '@/http/Repositories/Employee'

export function makeFindByName() {
  const employeePrismaRepository = new EmployeePrismaRepository()
  const listEmployeesByNameUseCase = new ListEmployeesByNameUseCase(
    employeePrismaRepository,
  )

  return listEmployeesByNameUseCase
}
