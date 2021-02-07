import { ChakraProvider } from '@chakra-ui/react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import React, { FC } from 'react'
import { SWRConfig } from 'swr'

import { theme } from '../../theme'

const Providers: FC = ({ children }) => {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 0,
        fetcher: (url) => fetch(url).then((r) => r.json())
      }}
    >
      <ChakraProvider resetCSS theme={theme}>
        {children}
      </ChakraProvider>
    </SWRConfig>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'

export { customRender as render }
