import { Log, User } from '@/domain/Entities'
import { LogRepository, UserRepository } from '@/domain/Repositories'

type InputUserUpdateName = {
  email: string
  newName: string
  userId: string
}

export class UpdateUserNameUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logRepository: LogRepository,
  ) {}

  async execute({
    newName,
    email,
    userId,
  }: InputUserUpdateName): Promise<User> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('Email already used!')
    }

    const oldName = user.getName()

    user.updateName(newName)

    const userUpdate = await this.userRepository.update(user)

    const maxId = await this.logRepository.maxId()

    const log = new Log({
      id: maxId,
      module: 'User',
      obs: `Atualização do nome antigo ${oldName} para ${newName}`,
      createdAt: new Date(),
      moduleKey: user.getId(),
      userId,
    })

    await this.logRepository.create(log)

    return userUpdate
  }
}
