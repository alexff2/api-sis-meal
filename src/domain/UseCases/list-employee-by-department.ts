import { EmployeeRepository } from '../Repositories'

export class ListEmployeesByDepartmentUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(departmentId: number) {
    const repositories =
      await this.employeeRepository.findByDepartment(departmentId)

    return repositories
  }
}
