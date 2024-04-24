export interface Token {
  execute: (value: string) => Promise<string>
}
