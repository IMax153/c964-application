import { pipe } from 'fp-ts/function'
import * as D from 'io-ts/Decoder'

export interface Prediction {
  readonly predictedWinner: 'Red' | 'Blue'
}

const makePrediction = (predictedWinner: 'Red' | 'Blue'): Prediction => ({
  predictedWinner
})

const numberToPrediction = (n: number): Prediction =>
  n < 0 ? makePrediction('Red') : makePrediction('Blue')

export const Predictions = pipe(
  D.type({
    predictions: D.tuple(D.tuple(D.number))
  }),
  D.map(({ predictions }) => predictions[0][0]),
  D.map(numberToPrediction)
)
