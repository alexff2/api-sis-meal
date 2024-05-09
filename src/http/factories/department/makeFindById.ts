import { ListDepartmentByIdUseCase } from '@/domain/UseCases'
import { DepartmentPrimsRepository } from '@/http/Repositories/Department'

export function makeFindDepartmentById() {
  const DepartmentRepository = new DepartmentPrimsRepository()
  const listDepartmentByIdUseCase = new ListDepartmentByIdUseCase(
    DepartmentRepository,
  )

  return listDepartmentByIdUseCase
}
