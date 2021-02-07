import { render, waitFor } from '../../lib/test-utils'
import { FrequencyChart } from './index'

describe('FrequencyChart', () => {
  it('should render a bar chart', async () => {
    const { container } = render(
      <FrequencyChart
        id="test"
        title="Test"
        data={[
          { name: 'first', count: 1 },
          { name: 'second', count: 2 }
        ]}
        filterOptions={[]}
        filterCompare={() => false}
        filterPlaceholder="Placeholder"
        containerProps={{ height: 200, width: 200, aspect: 1 }}
      />
    )

    await waitFor(() => {
      const chart = container.querySelector('.recharts-surface')

      expect(chart).toBeInTheDocument()
    })
  })
})
