export type DepartmentProps = {
  id: number
  name: string
  createdAt: Date
  userId: string
}

export class Department {
  constructor(private props: DepartmentProps) {}

  getProps() {
    return this.props
  }

  getId() {
    return this.props.id
  }

  getName() {
    return this.props.name
  }

  updateName(value: string) {
    this.props.name = value
  }
}
