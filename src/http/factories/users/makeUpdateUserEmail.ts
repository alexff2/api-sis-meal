import { UpdateUserEmailUseCase } from '@/domain/UseCases'
import { UserPrismaRepository, LogPrismaRepository } from '@/http/Repositories'

export function makeUpdateUserEmail() {
  const userRepository = new UserPrismaRepository()
  const logRepository = new LogPrismaRepository()
  const updateUserEmailUseCase = new UpdateUserEmailUseCase(
    userRepository,
    logRepository,
  )

  return updateUserEmailUseCase
}
