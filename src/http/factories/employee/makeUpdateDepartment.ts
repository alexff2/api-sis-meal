import { UpdateEmployeeDepartmentUseCase } from '@/domain/UseCases'
import { LogPrismaRepository } from '@/http/Repositories'
import { DepartmentPrimsRepository } from '@/http/Repositories/Department'
import { EmployeePrismaRepository } from '@/http/Repositories/Employee'

export function makeUpdateDepartment() {
  const employeeRepository = new EmployeePrismaRepository()
  const departmentRepository = new DepartmentPrimsRepository()
  const logRepository = new LogPrismaRepository()
  const updateEmployeeDepartmentUseCase = new UpdateEmployeeDepartmentUseCase(
    employeeRepository,
    departmentRepository,
    logRepository,
  )

  return updateEmployeeDepartmentUseCase
}
