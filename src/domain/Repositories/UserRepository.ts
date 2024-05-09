import { User, UserProps } from '../Entities/User'

export interface UserRepository {
  usersIsEmpty: () => Promise<boolean>
  save: (user: User) => Promise<void>
  findAll: () => Promise<UserProps[] | []>
  findByEmail: (email: string) => Promise<User | null>
  update: (user: User) => Promise<User>
}
