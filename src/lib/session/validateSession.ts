import * as E from 'fp-ts/Either'
import * as Eq from 'fp-ts/Eq'
import { constFalse, pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'

export interface IsAuthorized {
  readonly isAuthorized: boolean
}

export const validateSession = (token: string): Promise<IsAuthorized> => {
  const isAuthorized = pipe(
    O.fromNullable(process.env.SECRET_DEVELOPMENT_TOKEN),
    E.fromOption(() => 'Internal server error'),
    E.fold(constFalse, (secret) => Eq.eqString.equals(secret, token))
  )

  return isAuthorized
    ? Promise.resolve({ isAuthorized })
    : Promise.reject(new Error('Invalid development token'))
}
