import './styles.css'

import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

import { request } from '../lib/remote'
import { theme } from '../theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SWRConfig
      value={{
        fetcher: request
      }}
    >
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  )
}
export default App
