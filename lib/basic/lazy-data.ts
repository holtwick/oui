import type { LoggerInterface } from 'zeed'
import { reactive } from 'vue'
import { arrayEmptyInPlace, createArray, Logger } from 'zeed'

const log: LoggerInterface = Logger('lazy-data')

interface Config<T> {
  onFetch: (from: number, length: number) => Promise<T[]>
  chunkSize?: number
  margin?: number
  size?: number
}

enum ChunkStatus {
  Loading = 1,
  Loaded,
  Error,
}

export function useLazyData<T>(opt: Config<T>) {
  const { chunkSize = 10, margin = 5, onFetch, size = 0 } = opt

  let iteration = 0
  let dataSize = 0
  const data = reactive<(T | null)[]>([])
  const chunks: Record<number, ChunkStatus | undefined> = {}

  function reload() {
    iteration++
    arrayEmptyInPlace(data)
    const newData = createArray(dataSize) as (T | null)[]
    data.push(...newData as any)
  }

  function setSize(size: number) {
    dataSize = size
    reload()
  }

  if (size > 0)
    setSize(size)

  function setVisible(fromPos: number, toPos: number) {
    log.assert(fromPos <= toPos, 'fromPos must be less than or equal to toPos')
    const fromChunk = Math.floor(Math.max(0, fromPos - margin) / chunkSize)
    const toChunk = Math.floor((toPos + margin) / chunkSize) * chunkSize
    const iterationNow = iteration
    onFetch(fromChunk * chunkSize, ((toChunk - fromChunk) * chunkSize) + chunkSize).then((result) => {
      if (iterationNow !== iteration)
        return
      for (let i = fromChunk; i <= toChunk; i++)
        chunks[i] = ChunkStatus.Loaded

      // arraySetArrayInPlace(data, result, fromChunk * chunkSize)
    })
  }

  return {
    setSize,
    getSize: () => dataSize,
    setVisible,
    reload,
    data,
  }
}
