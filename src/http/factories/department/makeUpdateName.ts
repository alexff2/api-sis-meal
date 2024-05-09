import { UpdateDepartmentNameUseCase } from '@/domain/UseCases'
import { LogPrismaRepository } from '@/http/Repositories'
import { DepartmentPrimsRepository } from '@/http/Repositories/Department'

export function makeUpdateName() {
  const departmentRepository = new DepartmentPrimsRepository()
  const logRepository = new LogPrismaRepository()
  const updateDepartmentNameUseCase = new UpdateDepartmentNameUseCase(
    departmentRepository,
    logRepository,
  )

  return updateDepartmentNameUseCase
}
