import userEvents from '@testing-library/user-event'

import { render } from '../../lib/test-utils'
import { PredictionDialog } from './index'

describe('PredictionDialog', () => {
  it('should render a prediction dialog', async () => {
    const onClose = jest.fn()
    const { getByText, queryByText } = render(
      <PredictionDialog isOpen onClose={onClose} prediction={{ predictedWinner: 'Red' }} />
    )

    const predictedWinner = queryByText('The predicted winner of the match is the Red Team!')
    const closeButton = getByText('Close')

    expect(predictedWinner).toBeInTheDocument()

    userEvents.click(closeButton)

    expect(onClose).toHaveBeenCalled()
  })
})
