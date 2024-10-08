import type { LoggerInterface } from 'zeed'
import { describe, expect, it } from 'vitest'
import { createArray, Logger, sleep } from 'zeed'
import { useLazyData } from './lazy-data'

const log: LoggerInterface = Logger('lazy-data.spec')

describe('useLazyData', () => {
  async function onFetch(offset: number, length: number) {
    log('onFetch', offset, length)
    return createArray(length).map((_, i) => offset + i)
  }

  it('should generate fake data', async () => {
    const result = await onFetch(5, 5)
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

  it('should set visible data correctly', async () => {
    const { setSize, setVisible, data } = useLazyData({
      onFetch,
      chunkSize: 2,
      margin: 2,
    })
    setSize(20)
    setVisible(3, 2)

    await sleep(100)

    expect(data).toMatchInlineSnapshot(`
      [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ]
    `)

    setVisible(4, 2)
    await sleep(100)

    expect(data).toMatchInlineSnapshot(`
      [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ]
    `)
  })
})
