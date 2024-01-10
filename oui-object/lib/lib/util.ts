export function objectToString(thisArg: unknown) {
  return Object.prototype.toString.call(thisArg).slice(8, -1)
}

export type Path = PropertyKey[]
