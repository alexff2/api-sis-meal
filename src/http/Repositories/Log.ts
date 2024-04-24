import { Log } from '@/domain/Entities'
import { LogRepository } from '@/domain/Repositories'
import { prisma } from '@/http/lib/prisma'

export class LogPrismaRepository implements LogRepository {
  async create(log: Log) {
    await prisma.log.create({
      data: log.getProps(),
    })
  }

  async maxId() {
    const { _max } = await prisma.log.aggregate({
      _max: {
        id: true,
      },
    })

    if (_max.id) {
      return Number(_max.id) + 1
    }

    return 1
  }
}
