import { InactiveEmployeeUseCase } from '@/domain/UseCases'
import { LogPrismaRepository } from '@/http/Repositories'
import { EmployeePrismaRepository } from '@/http/Repositories/Employee'

export function makeInactive() {
  const employeeRepository = new EmployeePrismaRepository()
  const logRepository = new LogPrismaRepository()
  const inactiveEmployeeUseCase = new InactiveEmployeeUseCase(
    employeeRepository,
    logRepository,
  )

  return inactiveEmployeeUseCase
}
