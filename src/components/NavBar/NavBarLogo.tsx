import type { BoxProps } from '@chakra-ui/react'
import { Box, Heading } from '@chakra-ui/react'

export interface NavBarLogoProps extends BoxProps {}

export const NavBarLogo: React.FC<NavBarLogoProps> = ({ children, ...props }) => (
  <Box {...props}>
    <Heading color="teal.500" size="md" fontWeight="bold">
      {children}
    </Heading>
  </Box>
)
