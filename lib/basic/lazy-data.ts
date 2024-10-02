import { reactive } from 'vue'
import { arrayEmptyInPlace, createArray } from 'zeed'

interface Config<T> {
  onFetch: (from: number, to: number) => Promise<T[]>
  chunkSize?: number
  margin?: number
}

enum ChunkStatus {
  Loading = 1,
  Loaded,
  Error,
}

export function useLazyData<T>(opt: Config<T>) {
  const { chunkSize = 10, margin = 5, onFetch } = opt

  let dataSize = 0
  const data = reactive<(T | null)[]>([])
  const chunks: Record<number, ChunkStatus | undefined> = {}

  function reload() {
    arrayEmptyInPlace(data)
    const newData = createArray(dataSize) as (T | null)[]
    data.push(...newData as any)
  }

  function setSize(size: number) {
    dataSize = size
    reload()
  }

  function setVisible(fromPos: number, toPos: number) {
    const fromChunk = Math.floor(fromPos / chunkSize)
    const toChunk = Math.floor(toPos / chunkSize)
  }

  return {
    setSize,
    getSize: () => dataSize,
    setVisible,
    reload,
    data,
  }
}
