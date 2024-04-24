import { Log } from '@/domain/Entities'
import { HashString } from '@/domain/Adapters'
import { User } from '@/domain/Entities/User'
import { LogRepository, UserRepository } from '@/domain/Repositories'
import { InvalidCredentialsError } from '../Erros/Invalid-credentials-error'

type InputUserUpdateEmail = {
  email: string
  oldPassword: string
  password: string
  userId: string
}

export class UpdateUserPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashString: HashString,
    private readonly logRepository: LogRepository,
  ) {}

  async execute({
    email,
    oldPassword,
    password,
    userId,
  }: InputUserUpdateEmail): Promise<User> {
    const user = await this.userRepository.findByEmail(email)

    if (user === null) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = await this.hashString.compare(
      oldPassword,
      user.getPassword(),
    )

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const has_password = await this.hashString.create(password)

    user.updatePassword(has_password)

    const userUpdate = await this.userRepository.update(user)

    const maxId = await this.logRepository.maxId()

    const log = new Log({
      id: maxId,
      module: 'User',
      obs: `Atualização da senha do usuário ${userUpdate.getName()}`,
      createdAt: new Date(),
      moduleKey: user.getId(),
      userId,
    })

    await this.logRepository.create(log)

    return userUpdate
  }
}
