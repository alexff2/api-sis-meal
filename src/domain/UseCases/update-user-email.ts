import { User, Log } from '@/domain/Entities'
import { UserRepository, LogRepository } from '@/domain/Repositories'

type InputUserUpdateEmail = {
  oldEmail: string
  newEmail: string
  userId: string
}

export class UpdateUserEmailUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logRepository: LogRepository,
  ) {}

  async execute({
    newEmail,
    oldEmail,
    userId,
  }: InputUserUpdateEmail): Promise<User> {
    const user = await this.userRepository.findByEmail(newEmail)

    if (user) {
      throw new Error('Email already used!')
    }

    const newUser = await this.userRepository.findByEmail(oldEmail)

    if (!newUser) {
      throw new Error('Old email invalid!')
    }

    newUser.updateEmail(newEmail)

    const userUpdate = await this.userRepository.update(newUser)

    const maxId = await this.logRepository.maxId()

    const log = new Log({
      id: maxId,
      module: 'User',
      obs: `Atualização do email antigo ${oldEmail} para ${newEmail}`,
      createdAt: new Date(),
      moduleKey: newUser.getId(),
      userId,
    })

    await this.logRepository.create(log)

    return userUpdate
  }
}
