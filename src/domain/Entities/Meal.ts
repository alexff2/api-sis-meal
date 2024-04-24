type MealProps = {
  id: number
  employeeId: number
  dateTime: Date
  userId: string
}

export class Meal {
  constructor(private props: MealProps) {}

  getProps() {
    return this.props
  }

  getId() {
    return this.props.id
  }

  getIdEmployee() {
    return this.props.employeeId
  }
}
