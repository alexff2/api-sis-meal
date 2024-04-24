import { Log } from '@/domain/Entities'

export interface LogRepository {
  create: (log: Log) => Promise<void>
  maxId: () => Promise<number>
}
