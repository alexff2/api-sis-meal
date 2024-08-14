export class MealsNotFoundError extends Error {
  constructor() {
    super('Meals Not Found.')
  }
}
