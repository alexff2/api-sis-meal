import { ListDepartmentUseCase } from '@/domain/UseCases/list-department'
import { DepartmentPrimsRepository } from '@/http/Repositories/Department'

export function makeListDepartment() {
  const DepartmentRepository = new DepartmentPrimsRepository()
  const listDepartmentUseCase = new ListDepartmentUseCase(DepartmentRepository)

  return listDepartmentUseCase
}
