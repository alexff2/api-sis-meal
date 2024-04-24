import { EmployeeNotFoundError } from '@/domain/Erros/employee-not-found-error.ts'
import { EmployeeRepository, LogRepository } from '@/domain/Repositories'
import { EmployeeAlreadyExistsError } from '../Erros/employee-already-exist-error'
import { Log } from '../Entities'

type InputUpdateEmployeeName = {
  id: number
  newName: string
  userId: string
}

export class UpdateEmployeeNameUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly logRepository: LogRepository,
  ) {}

  async save({ id, newName, userId }: InputUpdateEmployeeName) {
    const employee = await this.employeeRepository.findById(id)

    if (!employee) {
      throw new EmployeeNotFoundError()
    }

    const nameAlreadyExists = await this.employeeRepository.findByName(newName)

    if (nameAlreadyExists) {
      throw new EmployeeAlreadyExistsError()
    }

    const oldName = employee.getName()

    employee.updateName(newName)

    await this.employeeRepository.update(employee)

    const maxId = await this.logRepository.maxId()

    const log = new Log({
      id: maxId,
      module: 'Employee',
      obs: `Atualização do nome antigo ${oldName} para ${newName}`,
      createdAt: new Date(),
      moduleKey: String(employee.getId()),
      userId,
    })

    await this.logRepository.create(log)
  }
}
