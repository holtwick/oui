import { inject } from 'vue'

export function t(s: string, ...args: any): string {
  return (inject('t') ?? ((s: string) => String(s))) as any
}
