import { pipe } from 'fp-ts/function'
import type { TaskDecoder } from 'io-ts/TaskDecoder'
import * as TD from 'io-ts/TaskDecoder'

export interface IntegerBrand {
  readonly Integer: unique symbol
}

export type Integer = number & IntegerBrand

export const Integer: TaskDecoder<unknown, Integer> = pipe(
  TD.number,
  TD.refine((n): n is Integer => Number.isInteger(n), 'Integer')
)
