import { Employee } from '@/domain/Entities'
import { EmployeeRepository } from '@/domain/Repositories'
import { prisma } from '@/http/lib/prisma'

export class EmployeePrismaRepository implements EmployeeRepository {
  async findByName(name: string) {
    const employee = await prisma.employee.findMany({
      where: {
        name: {
          startsWith: name,
        },
      },
    })

    return employee
  }

  async findByDepartment(departmentId: number) {
    const employee = await prisma.employee.findMany({ where: { departmentId } })

    return employee
  }

  async maxId() {
    const { _max } = await prisma.employee.aggregate({
      _max: {
        id: true,
      },
    })

    if (_max.id) {
      return Number(_max.id) + 1
    }

    return 10000
  }

  async findById(id: number) {
    const employee = await prisma.employee.findUnique({ where: { id } })

    if (!employee) {
      return null
    }

    return employee
  }

  async create(employee: Employee) {
    await prisma.employee.create({ data: employee.getProps() })
  }

  async update(employee: Employee) {
    await prisma.employee.update({
      data: employee.getProps(),
      where: { id: employee.getId() },
    })
  }
}
