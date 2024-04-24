import { Log } from '@/domain/Entities'
import {
  EmployeeAlreadyInactiveError,
  EmployeeNotFoundError,
} from '@/domain/Erros'
import { EmployeeRepository, LogRepository } from '@/domain/Repositories'

type InputInactiveEmployee = {
  id: number
  userId: string
}

export class InactiveEmployeeUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly logRepository: LogRepository,
  ) {}

  async execute({ id, userId }: InputInactiveEmployee) {
    const employee = await this.employeeRepository.findById(id)

    if (!employee) {
      throw new EmployeeNotFoundError()
    }

    if (employee.getInactivatedAt()) {
      throw new EmployeeAlreadyInactiveError()
    }

    employee.inactive(new Date())

    this.employeeRepository.update(employee)

    const maxId = await this.logRepository.maxId()

    const log = new Log({
      id: maxId,
      module: 'Employee',
      obs: 'Inativação',
      createdAt: new Date(),
      moduleKey: String(employee.getId()),
      userId,
    })

    await this.logRepository.create(log)
  }
}
