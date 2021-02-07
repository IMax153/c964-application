import preloadAll from 'jest-next-dynamic'
import { FormProvider, useForm } from 'react-hook-form'

import { render, waitFor } from '../../lib/test-utils'
import { SelectOption } from '../Select'
import { Summoner } from './index'

beforeAll(async () => {
  await preloadAll()
})

interface DefaultValues {
  readonly 'participant1.champion': SelectOption | undefined
  readonly 'banned1.champion': SelectOption | undefined
  readonly 'participant1.spell1Id': SelectOption | undefined
  readonly 'participant1.spell2Id': SelectOption | undefined
  readonly 'participant1.championSpecificWinRate': string | undefined
}

interface TestComponentProps {
  readonly defaultValues: DefaultValues
}

const TestComponent: React.FC<TestComponentProps> = ({ defaultValues }) => {
  const methods = useForm({
    defaultValues
  })

  return (
    <FormProvider {...methods}>
      <Summoner identifier={1} />
    </FormProvider>
  )
}

describe('Summoner', () => {
  it('should display a placeholder if no champion is selected', async () => {
    const { getByAltText } = render(
      <TestComponent
        defaultValues={{
          'participant1.champion': undefined,
          'banned1.champion': undefined,
          'participant1.spell1Id': undefined,
          'participant1.spell2Id': undefined,
          'participant1.championSpecificWinRate': undefined
        }}
      />
    )

    await waitFor(() => {
      const img = getByAltText('Unselected Champion')
      expect(img).toHaveAttribute('src', 'https://via.placeholder.com/150x150.png?text=Unselected')
    })
  })
})
