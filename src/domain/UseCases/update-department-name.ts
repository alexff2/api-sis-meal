import { Log } from '../Entities'
import { DepartmentAlreadyExistsError } from '../Erros/department-already-exist-error'
import { DepartmentRepository, LogRepository } from '../Repositories'

type InputUpdateDepartmentName = {
  id: number
  newName: string
  userId: string
}

export class UpdateDepartmentNameUseCase {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
    private readonly logRepository: LogRepository,
  ) {}

  async save({ id, newName, userId }: InputUpdateDepartmentName) {
    const department = await this.departmentRepository.findById(id)

    if (!department) {
      throw new Error('Department not found')
    }

    const nameAlreadyExists =
      await this.departmentRepository.findByName(newName)

    if (nameAlreadyExists) {
      throw new DepartmentAlreadyExistsError()
    }

    const oldName = department.getName()

    department.updateName(newName)

    await this.departmentRepository.update(department)

    const maxId = await this.logRepository.maxId()

    const log = new Log({
      id: maxId,
      module: 'Department',
      obs: `Atualização do nome antigo ${oldName} para ${newName}`,
      createdAt: new Date(),
      moduleKey: String(department.getId()),
      userId,
    })

    await this.logRepository.create(log)
  }
}
