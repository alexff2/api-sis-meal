import { CreateUserUseCase } from '@/domain/UseCases'
import { UserPrismaRepository } from '@/http/Repositories'
import { HashStringRepository } from '@/http/Adapters/HashString'

export function makeCreateUser() {
  const userRepository = new UserPrismaRepository()
  const hashStringAdapter = new HashStringRepository()
  const createUserUseCase = new CreateUserUseCase(
    userRepository,
    hashStringAdapter,
  )

  return createUserUseCase
}
