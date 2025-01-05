import { inject } from 'vue'

export function t(id: string, ...args: any): string {
  return ((inject('t') ?? ((s: string) => String(s))) as any)(id, ...args)
}

export function tt(defaultString: string, id: string, ...args: any): string {
  return ((inject('t') ?? ((s: string) => String(defaultString))) as any)(id, ...args)
}
