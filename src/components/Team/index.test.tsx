import preloadAll from 'jest-next-dynamic'
import { FormProvider, useForm } from 'react-hook-form'

import { render, waitFor } from '../../lib/test-utils'
import { Team } from './index'

beforeAll(async () => {
  await preloadAll()
})

interface TestComponentProps {
  readonly color: 'Red' | 'Blue'
  readonly defaultValues: any
}

const TestComponent: React.FC<TestComponentProps> = ({ color, defaultValues }) => {
  const methods = useForm({
    defaultValues
  })

  return (
    <FormProvider {...methods}>
      <Team color={color} />
    </FormProvider>
  )
}

describe('Team', () => {
  it('should display a placeholder if no champion is selected', async () => {
    const defaultValues = Array.from({ length: 5 }, (_, i) => i + 1)
      .map((i) => ({
        [`participant${i}.champion`]: undefined,
        [`banned${i}.champion`]: undefined,
        [`participant${i}.spell1Id`]: undefined,
        [`participant${i}.spell2Id`]: undefined,
        [`participant${i}.championSpecificWinRate`]: undefined
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})

    const { getByText } = render(<TestComponent color="Red" defaultValues={defaultValues} />)

    await waitFor(() => {
      const heading = getByText('Red Team')
      expect(heading).toBeInTheDocument()
    })
  })
})
