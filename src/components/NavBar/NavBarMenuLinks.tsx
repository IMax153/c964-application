import { Box, Stack } from '@chakra-ui/react'

export interface NavBarMenuLinksProps {}

export const NavBarMenuLinks: React.FC<NavBarMenuLinksProps> = ({ children }) => {
  return (
    <Box>
      <Stack spacing={8} align="center" justify="flex-end" direction="row">
        {children}
      </Stack>
    </Box>
  )
}

NavBarMenuLinks.displayName = 'NavBarMenuLinks'
