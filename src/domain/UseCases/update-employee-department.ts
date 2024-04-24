import { Log } from '@/domain/Entities'
import { DepartmentNotFoundError, EmployeeNotFoundError } from '@/domain/Erros'
import {
  DepartmentRepository,
  EmployeeRepository,
  LogRepository,
} from '@/domain/Repositories'

type InputUpdateEmployeeDepartment = {
  id: number
  departmentId: number
  userId: string
}

export class UpdateEmployeeDepartmentUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly departmentRepository: DepartmentRepository,
    private readonly logRepository: LogRepository,
  ) {}

  async save({ id, departmentId, userId }: InputUpdateEmployeeDepartment) {
    const employee = await this.employeeRepository.findById(id)

    if (!employee) {
      throw new EmployeeNotFoundError()
    }

    const department = await this.departmentRepository.findById(departmentId)

    if (!department) {
      throw new DepartmentNotFoundError()
    }

    const oldDepartment = await this.departmentRepository.findById(
      employee.getDepartment(),
    )

    if (!oldDepartment) {
      console.log('Department old not found')
      throw new DepartmentNotFoundError()
    }

    employee.updateDepartment(departmentId)

    await this.employeeRepository.update(employee)

    const maxId = await this.logRepository.maxId()

    const log = new Log({
      id: maxId,
      module: 'Employee',
      obs: `Atualização do departamento antigo ${oldDepartment.getName()} para ${department.getName()}`,
      createdAt: new Date(),
      moduleKey: String(employee.getId()),
      userId,
    })

    await this.logRepository.create(log)
  }
}
