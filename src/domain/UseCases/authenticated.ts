import { HashString } from '@/domain/Adapters'
import { UserProps } from '@/domain/Entities'
import { UserRepository } from '@/domain/Repositories'
import { InvalidCredentialsError } from '@/domain/Erros/Invalid-credentials-error'

type InputAuthenticated = {
  email: string
  password: string
}

type OutAuthenticated = {
  user: UserProps
}

export class AuthenticatedUseCase {
  constructor(
    private readonly hashString: HashString,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    email,
    password,
  }: InputAuthenticated): Promise<OutAuthenticated> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = this.hashString.compare(
      password,
      user.getPassword(),
    )

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user: user.getProps(),
    }
  }
}
