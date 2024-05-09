import { ListUserUseCase } from '@/domain/UseCases'
import { UserPrismaRepository } from '@/http/Repositories'

export function makeListUsers() {
  const userRepository = new UserPrismaRepository()
  const listUserUseCase = new ListUserUseCase(userRepository)

  return listUserUseCase
}
