import { Log, Employee, Department } from '@/domain/Entities'
import { DepartmentNotFoundError, EmployeeNotFoundError } from '@/domain/Erros'
import {
  DepartmentRepository,
  EmployeeRepository,
  LogRepository,
} from '@/domain/Repositories'

type InputUpdateEmployeeDepartment = {
  employeeId: number
  newDepartmentId: number
  userId: string
}

export class UpdateEmployeeDepartmentUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly departmentRepository: DepartmentRepository,
    private readonly logRepository: LogRepository,
  ) {}

  async execute({
    employeeId,
    newDepartmentId,
    userId,
  }: InputUpdateEmployeeDepartment) {
    const employee = await this.employeeRepository.findById(employeeId)

    if (!employee) {
      throw new EmployeeNotFoundError()
    }

    const department = await this.departmentRepository.findById(newDepartmentId)

    if (!department) {
      throw new DepartmentNotFoundError()
    }

    const departmentEntity = new Department(department)

    const oldDepartment = await this.departmentRepository.findById(
      employee.departmentId,
    )

    if (!oldDepartment) {
      console.log('Old department not found')
      throw new DepartmentNotFoundError()
    }

    const oldDepartmentEntity = new Department(oldDepartment)

    employee.departmentId = newDepartmentId

    const employeeEntity = new Employee(employee)

    await this.employeeRepository.update(employeeEntity)

    const maxId = await this.logRepository.maxId()

    const log = new Log({
      id: maxId,
      module: 'Employee',
      obs: `Atualização do departamento antigo ${oldDepartmentEntity.getName()} para ${departmentEntity.getName()}`,
      createdAt: new Date(),
      moduleKey: String(employeeEntity.getId()),
      userId,
    })

    await this.logRepository.create(log)
  }
}
