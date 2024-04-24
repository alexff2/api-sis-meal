type TypeLog = {
  id: number
  module: string
  obs: string
  userId: string
  moduleKey: string
  createdAt: Date
}

export class Log {
  private readonly props: TypeLog

  constructor({ id, module, obs, userId, moduleKey, createdAt }: TypeLog) {
    this.props = {
      id,
      module,
      obs,
      userId,
      moduleKey,
      createdAt,
    }
  }

  getProps() {
    return this.props
  }
}
