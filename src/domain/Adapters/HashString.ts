export interface HashString {
  create: (value: string) => Promise<string>
  compare: (value: string, value_hash: string) => Promise<boolean>
}
