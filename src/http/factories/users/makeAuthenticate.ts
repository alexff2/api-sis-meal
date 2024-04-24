import { AuthenticatedUseCase } from '@/domain/UseCases'
import { HashStringRepository } from '@/http/Adapters/HashString'
import { UserPrismaRepository } from '@/http/Repositories'

export function makeAuthenticateUseCase() {
  const hashString = new HashStringRepository()
  const userRepository = new UserPrismaRepository()
  const authenticateUseCase = new AuthenticatedUseCase(
    hashString,
    userRepository,
  )

  return authenticateUseCase
}
