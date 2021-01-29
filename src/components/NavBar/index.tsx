import type { FlexProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useSession } from '../../lib/hooks'
import { request } from '../../lib/remote'
import { NavBarContainer } from './NavBarContainer'
import { NavBarLogo } from './NavBarLogo'
import { NavBarMenuLink } from './NavBarMenuLink'
import { NavBarMenuLinks } from './NavBarMenuLinks'

export interface NavBarProps extends FlexProps {}

export const NavBar: React.FC<NavBarProps> = (props) => {
  const { data, mutateSession } = useSession()
  const router = useRouter()

  return (
    <NavBarContainer {...props}>
      <NavBarLogo>League of Legends Match Predictor</NavBarLogo>
      <NavBarMenuLinks>
        {data?.isAuthorized && (
          <>
            <NavBarMenuLink to="/predictor">Match Predictor</NavBarMenuLink>
            <NavBarMenuLink to="/dashboard">Dashboard</NavBarMenuLink>
            <NavBarMenuLink
              to="/api/logout"
              onClick={async (e) => {
                e.preventDefault()
                await mutateSession(request('/api/logout'))
                router.push('/')
              }}
              asButton
            >
              Logout
            </NavBarMenuLink>
          </>
        )}
      </NavBarMenuLinks>
    </NavBarContainer>
  )
}

NavBar.displayName = 'NavBar'
