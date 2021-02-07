import preloadAll from 'jest-next-dynamic'

import { render, waitFor } from '../../lib/test-utils'
// import { SelectOption } from '../index'
import { Select } from './index'

beforeAll(async () => {
  await preloadAll()
})

describe('Summoner', () => {
  it('should display a select input', async () => {
    const { container } = render(<Select />)

    await waitFor(() => {
      const select = container.querySelector('input[type="text"]')
      expect(select).toBeInTheDocument()
    })
  })

  it('should support default values', async () => {
    const { container } = render(<Select defaultInputValue="1" />)

    await waitFor(() => {
      const select = container.querySelector('input[type="text"]')
      expect(select).toHaveAttribute('value', '1')
    })
  })
})
