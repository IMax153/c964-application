import { Button } from '@chakra-ui/react'
import NextLink from 'next/link'

export interface NavBarMenuLinkProps {
  readonly to: string
  readonly asButton?: boolean
  readonly isExternal?: boolean
  readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const NavBarMenuLink: React.FC<NavBarMenuLinkProps> = ({
  asButton = false,
  children,
  onClick,
  to
}) => {
  return (
    <NextLink href={to} passHref>
      <Button as="a" colorScheme="teal" variant={asButton ? 'solid' : 'link'} onClick={onClick}>
        {children}
      </Button>
    </NextLink>
  )
}

NavBarMenuLink.displayName = 'NavBarMenuLink'
