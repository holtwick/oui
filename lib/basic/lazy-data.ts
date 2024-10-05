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
    const fromIndex = Math.max(0, fromPos - margin)
    const toIndex = Math.min(dataSize, toPos + margin)
    const fromChunk = Math.floor(fromIndex / chunkSize)
    const toChunk = Math.floor(toIndex / chunkSize)

    const allChunksToLoad: number[] = []

    let chunksToLoad: number[] = []

    function flush() {
      if (chunksToLoad.length === 0)
        return
      const loading = [...chunksToLoad]
      allChunksToLoad.push(...loading)
      chunksToLoad = []

      const fromIndex = loading[0] * chunkSize
      const itemCount = (loading[loading.length - 1] - loading[0] + 1) * chunkSize

      onFetch(fromIndex, itemCount).then((values) => {
        log('Loaded', fromIndex, itemCount, values)
        loading.forEach(i => chunks[i] = ChunkStatus.Loaded)
        for (let i = 0; i < itemCount; i++) {
          data[fromIndex + i] = values[i] as any
        }
      }).catch((e) => {
        log.error('Failed to load chunks', loading, e)
      })
    }

    for (let i = fromChunk; i <= toChunk; i++) {
      const chunk = chunks[i]
      if (chunk == null) {
        chunks[i] = ChunkStatus.Loading
        chunksToLoad.push(i)
      }
      else {
        flush()
      }
    }

    flush()

    return {
      fromIndex,
      toIndex,
      fromChunk,
      toChunk,
      allChunksToLoad,
    }
  }

  return {
    setSize,
    getSize: () => dataSize,
    setVisible,
    reload,
    data,
  }
}
