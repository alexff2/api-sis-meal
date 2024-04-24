import { hash, compare } from 'bcryptjs'
import { HashString } from '@/domain/Adapters'

export class HashStringRepository implements HashString {
  async create(value: string) {
    const value_hash = await hash(value, 6)
    return value_hash
  }

  async compare(value: string, value_hash: string) {
    const isMatch = await compare(value, value_hash)

    return isMatch
  }
}
