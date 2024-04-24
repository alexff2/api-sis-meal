export class EmployeeAlreadyInactiveError extends Error {
  constructor() {
    super('Employee already inactive.')
  }
}
