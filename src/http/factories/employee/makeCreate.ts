import { CreateEmployeeUseCase } from '@/domain/UseCases/create-employee'
import { DepartmentPrimsRepository } from '@/http/Repositories/Department'
import { EmployeePrismaRepository } from '@/http/Repositories/Employee'

export function makeCreate() {
  const employeeRepository = new EmployeePrismaRepository()
  const departmentRepository = new DepartmentPrimsRepository()
  const createEmployeeUseCase = new CreateEmployeeUseCase(
    employeeRepository,
    departmentRepository,
  )

  return createEmployeeUseCase
}
