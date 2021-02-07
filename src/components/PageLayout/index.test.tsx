import { render } from '../../lib/test-utils'
import { PageLayout } from './index'

describe('PageLayout', () => {
  it('should render the layout of the page', () => {
    const { container } = render(<PageLayout>test</PageLayout>)

    expect(container.querySelector('main')).toHaveTextContent('test')
  })
})
