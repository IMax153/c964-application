import { extendTheme } from '@chakra-ui/react'
import type { Theme } from '@chakra-ui/theme'
import { theme as baseTheme } from '@chakra-ui/theme'

const fonts = { mono: `'Menlo', monospace` }

export const theme: Theme = extendTheme({ fonts }, baseTheme)
