import { Box } from '@chakra-ui/react'
import Head from 'next/head'

import { NavBar } from '../NavBar'

export interface PageLayoutProps {}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>League of Legends Match Predictor</Head>
      <NavBar h="5vh" />
      <Box as="main" h="95vh" w="100%" bg="gray.100">
        {children}
      </Box>
    </>
  )
}

PageLayout.displayName = 'PageLayout'
