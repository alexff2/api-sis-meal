import { UpdateEmployeeNameUseCase } from '@/domain/UseCases'
import { LogPrismaRepository } from '@/http/Repositories'
import { EmployeePrismaRepository } from '@/http/Repositories/Employee'

export function makeUpdateName() {
  const employeeRepository = new EmployeePrismaRepository()
  const logRepository = new LogPrismaRepository()
  const updateEmployeeNameUseCase = new UpdateEmployeeNameUseCase(
    employeeRepository,
    logRepository,
  )

  return updateEmployeeNameUseCase
}
