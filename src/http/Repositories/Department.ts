import { Department } from '@/domain/Entities'
import { DepartmentRepository } from '@/domain/Repositories'
import { prisma } from '@/http/lib/prisma'

export class DepartmentPrimsRepository implements DepartmentRepository {
  async findByName(name: string) {
    const department = await prisma.department.findMany({
      where: {
        name: {
          startsWith: name,
        },
      },
    })

    return department
  }

  async findAll() {
    return prisma.department.findMany()
  }

  async maxId() {
    const { _max } = await prisma.department.aggregate({
      _max: {
        id: true,
      },
    })

    if (_max.id) {
      return Number(_max.id) + 1
    }

    return 1
  }

  async create(department: Department) {
    await prisma.department.create({
      data: department.getProps(),
    })
  }

  async findById(id: number) {
    const department = await prisma.department.findUnique({ where: { id } })

    if (!department) {
      return null
    }

    return department
  }

  async update(department: Department) {
    await prisma.department.update({
      data: department.getProps(),
      where: { id: department.getId() },
    })
  }
}
