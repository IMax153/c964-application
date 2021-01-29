import type { FlexProps } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import * as React from 'react'

export interface NavBarContainerProps extends FlexProps {}

export const NavBarContainer: React.FC<NavBarContainerProps> = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      p={6}
      bg="gray.50"
      boxShadow="base"
      {...props}
    >
      {children}
    </Flex>
  )
}

NavBarContainer.displayName = 'NavBarContainer'
