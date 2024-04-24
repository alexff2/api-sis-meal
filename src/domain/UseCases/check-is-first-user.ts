import { HashString } from '../Adapters'
import { User } from '../Entities/User'
import { UserRepository } from '../Repositories'

export class CheckIsFirstUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashString: HashString,
  ) {}

  async execute() {
    const usersIsEmpty = await this.userRepository.usersIsEmpty()

    if (!usersIsEmpty) {
      return
    }

    const password_hash = await this.hashString.create('123')
    const dateNow = new Date()

    const userCreate = new User({
      id: crypto.randomUUID(),
      name: 'Adm Master',
      email: 'master@adm.com',
      password: password_hash,
      userIdCreate: '0',
      createdAt: dateNow,
      active: true,
    })

    await this.userRepository.save(userCreate)
  }
}
