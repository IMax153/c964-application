import { render, waitFor } from '../../lib/test-utils'
import { PieChart } from './index'

describe('PieChart', () => {
  it('should render a radar chart', async () => {
    const { container } = render(
      <PieChart
        title="Test"
        indexKey="name"
        dataKey="count"
        data={[
          { name: 'Foo', count: 40 },
          { name: 'Bar', count: 60 }
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
