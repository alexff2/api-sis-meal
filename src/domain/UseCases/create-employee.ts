import { Employee } from '../Entities/Employee'
import { DepartmentNotFoundError } from '../Erros/department-not-found-error.ts'
import { EmployeeAlreadyExistsError } from '../Erros/employee-already-exist-error'
import { DepartmentRepository, EmployeeRepository } from '../Repositories'

type InputCreateEmployee = {
  name: string
  departmentId: number
  userId: string
}

export class CreateEmployeeUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  async save({ name, departmentId, userId }: InputCreateEmployee) {
    const employeeAlreadyExistsError =
      await this.employeeRepository.findByName(name)

    if (employeeAlreadyExistsError) {
      throw new EmployeeAlreadyExistsError()
    }

    const department = await this.departmentRepository.findById(departmentId)

    if (!department) {
      throw new DepartmentNotFoundError()
    }

    const maxId = await this.employeeRepository.maxId()

    const employee = new Employee({
      id: maxId,
      name,
      departmentId,
      userId,
      createdAt: new Date(),
    })

    await this.employeeRepository.create(employee)
  }
}
