import preloadAll from 'jest-next-dynamic'
import { FormProvider, useForm } from 'react-hook-form'

import { render, waitFor } from '../../lib/test-utils'
import { ControlledSelect, ControlledSelectProps } from './index'

beforeAll(async () => {
  await preloadAll()
})

const defaultOptions = [
  { label: 'one', value: '1' },
  { label: 'two', value: '2' }
]

const TestComponent: React.FC<ControlledSelectProps> = (props) => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <ControlledSelect {...props} />
    </FormProvider>
  )
}

describe('ControlledSelect', () => {
  it('should display a controlled select', async () => {
    const { container } = render(
      <TestComponent name="foo" isInvalid={false} options={defaultOptions} />
    )

    await waitFor(() => {
      const select = container.querySelector('input[type="hidden"]')
      expect(select).toBeInTheDocument()
    })
  })
})
