import { UserRepository } from '../Repositories'

export class ListUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    const users = await this.userRepository.findAll()

    return users
  }
}
