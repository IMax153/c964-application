import { render, waitFor } from '../../lib/test-utils'
import { RadarChart } from './index'

describe('RadarChart', () => {
  it('should render a radar chart', async () => {
    const { container } = render(
      <RadarChart
        title="Test"
        data={[
          { test: '1', first: 20, second: 30 },
          { test: '2', first: 20, second: 30 }
        ]}
        polarAngleKey="test"
        radars={[
          ['first', '#fff'],
          ['second', '#000']
        ]}
        containerProps={{ height: 200, width: 200, aspect: 1 }}
      />
    )

    await waitFor(() => {
      const chart = container.querySelector('.recharts-surface')

      expect(chart).toBeInTheDocument()
    })
  })
})
