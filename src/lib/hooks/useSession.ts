import Router from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

import type { IsAuthorized } from '../session'

export interface UseAuthOptions {
  readonly redirectIfAuthorized?: boolean
  readonly redirectTo?: string
}

export type MutateCallback<A> = (currentValue: A) => Promise<A> | A

export type MutateSession<A> = (
  data: A | Promise<A> | MutateCallback<A> | undefined,
  shouldRevalidate?: boolean
) => Promise<A | undefined>

export interface Session {
  readonly data?: IsAuthorized
  readonly mutateSession: MutateSession<IsAuthorized>
}

export const useSession = ({
  redirectIfAuthorized = false,
  redirectTo
}: UseAuthOptions = {}): Session => {
  const { data, mutate } = useSWR<IsAuthorized>('/api/session')

  useEffect(() => {
    // 1. If no redirect is needed then return (for example, the user is already on the
    //    prediction builder page)
    // 2. If the data has not yet been obtained (i.e. Promise is unresolved) then we also
    //    return
    if (!redirectTo || !data) return

    if (
      // 3. If redirectTo is set then redirect if no data was returned
      (redirectTo && !redirectIfAuthorized && data?.isAuthorized) ||
      // 4. If redirectIfAuthorized is also set then we redirect regardless
      (redirectIfAuthorized && data?.isAuthorized)
    ) {
      Router.push(redirectTo)
    }
  }, [data, redirectIfAuthorized, redirectTo])

  return { data, mutateSession: mutate }
}
