import { describe, expect, it } from 'vitest'
import { createArray } from 'zeed'
import { useLazyData } from './lazy-data'

describe('useLazyData', () => {
  async function onFetch(from: number, to: number) {
    return createArray(to - from).map((_, i) => from + i)
  }

  it('should generate fake data', async () => {
    const result = await onFetch(5, 10)
    expect(result).toMatchInlineSnapshot(`
      [
        5,
        6,
        7,
        8,
        9,
      ]
    `)
  })

  it('should initialize with size 0', () => {
    const { getSize } = useLazyData({ onFetch })
    expect(getSize()).toBe(0)
  })

  it('should set size correctly', () => {
    const { setSize, getSize, data } = useLazyData({ onFetch })
    setSize(5)
    expect(getSize()).toBe(5)
    expect(data.length).toBe(5)
    expect(data).toMatchInlineSnapshot(`
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ]
    `)
  })

  it('should reload data correctly', () => {
    const { setSize, reload, data } = useLazyData({ onFetch })
    setSize(3)
    reload()
    // Assuming the data is reactive and we can access it directly for testing purposes
    expect(data.length).toBe(3)
    expect(data.every(item => item == null)).toBe(true)
  })
})
