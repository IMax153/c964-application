import { Progress } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

export interface SelectOption {
  readonly label: string
  readonly value: string
}

export const Select = dynamic(() => import('react-select'), {
  ssr: false,
  loading: () => <Progress size="lg" colorScheme="teal" hasStripe value={100} />
})
