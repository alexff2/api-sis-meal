import { Department, DepartmentProps } from '../Entities/Department'
import { DepartmentAlreadyExistsError } from '../Erros/department-already-exist-error'
import { DepartmentRepository } from '../Repositories'

type InputCreateDepartment = {
  name: string
  userId: string
}

type OutputCreateDepartment = DepartmentProps

export class CreateDepartmentUseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async save({
    name,
    userId,
  }: InputCreateDepartment): Promise<OutputCreateDepartment> {
    const maxId = await this.departmentRepository.maxId()

    let department = await this.departmentRepository.findByName(name)

    if (department) {
      throw new DepartmentAlreadyExistsError()
    }

    department = new Department({
      id: maxId,
      name,
      createdAt: new Date(),
      userId,
    })

    await this.departmentRepository.create(department)

    return department.getProps()
  }
}
