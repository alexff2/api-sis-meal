import { User } from '@/domain/Entities'
import { UserRepository } from '@/domain/Repositories'
import { prisma } from '../lib/prisma'

export class UserPrismaRepository implements UserRepository {
  async usersIsEmpty() {
    const qtdUser = await prisma.user.count()

    return qtdUser === 0
  }

  async save(user: User) {
    await prisma.user.create({
      data: user.getProps(),
    })
  }

  async findAll() {
    const users = await prisma.user.findMany()

    return users
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return null
    }

    return new User(user)
  }

  async update(user: User) {
    await prisma.user.update({
      data: user.getProps(),
      where: { id: user.getId() },
    })

    return user
  }
}
