import userEvent from '@testing-library/user-event'

import { render, waitFor } from '../../lib/test-utils'
import { MatchForm } from './index'

describe('MatchForm', () => {
  it('should show an error on invalid form submission', async () => {
    const { getAllByText, getByText } = render(<MatchForm />)

    await waitFor(() => {
      const predictButton = getByText('Predict')

      userEvent.click(predictButton)

      const errorMessages = getAllByText('Required')

      expect(errorMessages.length).toBeGreaterThan(0)
    })
  })
})
