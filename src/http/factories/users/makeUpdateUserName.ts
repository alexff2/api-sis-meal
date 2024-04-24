import { UpdateUserNameUseCase } from '@/domain/UseCases'
import { UserPrismaRepository, LogPrismaRepository } from '@/http/Repositories'

export function makeUpdateUserName() {
  const userRepository = new UserPrismaRepository()
  const logRepository = new LogPrismaRepository()
  const updateUserNameUseCase = new UpdateUserNameUseCase(
    userRepository,
    logRepository,
  )

  return updateUserNameUseCase
}
