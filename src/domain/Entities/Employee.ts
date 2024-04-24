type EmployeeProps = {
  id: number
  name: string
  departmentId: number
  userId: string
  createdAt: Date
  inactivatedAt?: Date
}

export class Employee {
  constructor(private props: EmployeeProps) {}

  getProps() {
    return this.props
  }

  getId() {
    return this.props.id
  }

  getName() {
    return this.props.name
  }

  getDepartment() {
    return this.props.departmentId
  }

  getInactivatedAt() {
    return this.props.inactivatedAt
  }

  updateName(value: string) {
    this.props.name = value
  }

  updateDepartment(value: number) {
    this.props.departmentId = value
  }

  inactive(value: Date) {
    this.props.inactivatedAt = value
  }
}
