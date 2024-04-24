import { UpdateUserPasswordUseCase } from '@/domain/UseCases'
import { UserPrismaRepository, LogPrismaRepository } from '@/http/Repositories'
import { HashStringRepository } from '@/http/Adapters/HashString'

export function makeUpdateUserPassword() {
  const userRepository = new UserPrismaRepository()
  const logRepository = new LogPrismaRepository()
  const hashString = new HashStringRepository()
  const updateUserPasswordUseCase = new UpdateUserPasswordUseCase(
    userRepository,
    hashString,
    logRepository,
  )

  return updateUserPasswordUseCase
}
