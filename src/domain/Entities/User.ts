export type UserProps = {
  id: string
  email: string
  name: string
  password: string
  userIdCreate: string
  createdAt: Date
  active: boolean
}

export class User {
  constructor(private props: UserProps) {}

  getProps() {
    return this.props
  }

  getId() {
    return this.props.id
  }

  getEmail() {
    return this.props.email
  }

  getName() {
    return this.props.name
  }

  getPassword() {
    return this.props.password
  }

  updateName(value: string) {
    this.props.name = value
  }

  updateEmail(value: string) {
    this.props.email = value
  }

  updatePassword(value: string) {
    this.props.password = value
  }
}
