import { EmployeeRepository } from '../Repositories'

export class ListEmployeesByIdUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(id: number) {
    const employee = await this.employeeRepository.findById(id)

    return employee
  }
}
