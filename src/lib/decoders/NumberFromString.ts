import { pipe } from 'fp-ts/function'
import type { TaskDecoder } from 'io-ts/TaskDecoder'
import * as TD from 'io-ts/TaskDecoder'

export const NumberFromString: TaskDecoder<unknown, number> = pipe(
  TD.string,
  TD.parse((s) => {
    const n = parseFloat(s)
    return Number.isNaN(n) ? TD.failure(s, 'NumberFromString') : TD.success(n)
  })
)
