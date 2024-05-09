import { DepartmentRepository } from '../Repositories'

export class ListDepartmentUseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute() {
    const departments = await this.departmentRepository.findAll()

    return departments
  }
}
