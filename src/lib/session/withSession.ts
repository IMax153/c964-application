import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { NextApiRequest, NextApiResponse } from 'next'
import type { Session } from 'next-iron-session'
import { withIronSession } from 'next-iron-session'

export interface ApiRequestWithSession extends NextApiRequest {
  readonly session: Session
}

export interface SessionHandler<A> {
  (req: ApiRequestWithSession, res: NextApiResponse<A>): Promise<any> | any
}

export const withSession = <A>(
  handler: A extends (...args: any) => Promise<any> ? A : SessionHandler<A>
): SessionHandler<A> =>
  withIronSession(handler as any, {
    password: pipe(
      O.fromNullable(process.env.SECRET_COOKIE_PASSWORD),
      O.getOrElse(() => '')
    ),
    cookieName: 'lol-match-prediction/session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  })
