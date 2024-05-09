import { DepartmentRepository } from '../Repositories'

export class ListDepartmentByIdUseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(id: number) {
    const department = await this.departmentRepository.findById(id)

    return department
  }
}
