export class DepartmentNotFoundError extends Error {
  constructor() {
    super('Department Not Found.')
  }
}
