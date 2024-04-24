import { HashString } from '../Adapters'
import { User } from '../Entities/User'
import { UserRepository } from '../Repositories'

interface InputUserCreate {
  name: string
  email: string
  password: string
  userIdCreate: string
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashString: HashString,
  ) {}

  async execute({ name, email, password, userIdCreate }: InputUserCreate) {
    const password_hash = await this.hashString.create(password)
    const dateNow = new Date()

    const userCreate = new User({
      id: crypto.randomUUID(),
      name,
      email,
      password: password_hash,
      userIdCreate,
      createdAt: dateNow,
      active: true,
    })

    await this.userRepository.save(userCreate)
  }
}
