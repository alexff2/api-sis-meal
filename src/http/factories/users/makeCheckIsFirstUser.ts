import { CheckIsFirstUserUseCase } from '@/domain/UseCases'
import { UserPrismaRepository } from '@/http/Repositories'
import { HashStringRepository } from '@/http/Adapters/HashString'

export function makeCheckIsFirstUser() {
  const userRepository = new UserPrismaRepository()
  const hashString = new HashStringRepository()
  const checkIsFirstUserUseCase = new CheckIsFirstUserUseCase(
    userRepository,
    hashString,
  )

  return checkIsFirstUserUseCase
}
