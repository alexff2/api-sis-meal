export class EmployeeNotFoundError extends Error {
  constructor() {
    super('Employee Not Found.')
  }
}
