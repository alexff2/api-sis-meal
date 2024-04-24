import { CreateDepartmentUseCase } from '@/domain/UseCases/create-department'
import { DepartmentPrimsRepository } from '@/http/Repositories/Department'

export function makeCreate() {
  const departmentRepository = new DepartmentPrimsRepository()
  const createDepartmentUseCase = new CreateDepartmentUseCase(
    departmentRepository,
  )

  return createDepartmentUseCase
}
