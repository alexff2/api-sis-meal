import { EmployeeRepository } from '../Repositories'

export class ListEmployeesByNameUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(name: string) {
    const repositories = await this.employeeRepository.findByName(name)

    return repositories
  }
}
