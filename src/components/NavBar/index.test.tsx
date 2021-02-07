import fetch from 'jest-fetch-mock'

import { render } from '../../lib/test-utils'
import { NavBar } from './index'

describe('NavBarContainer', () => {
  it('should not render links for unauthorized users', () => {
    const { queryByText } = render(<NavBar />)

    const predictorLink = queryByText('Match Predictor')
    const dashboardLink = queryByText('Dashboard')
    const logoutLink = queryByText('Logout')

    expect(predictorLink).not.toBeInTheDocument()
    expect(dashboardLink).not.toBeInTheDocument()
    expect(logoutLink).not.toBeInTheDocument()
  })

  it('should render links for authorized users', async () => {
    fetch.mockResponseOnce(JSON.stringify({ isAuthorized: true }))

    const { findByText } = render(<NavBar />)

    const predictorLink = await findByText('Match Predictor')
    const dashboardLink = await findByText('Dashboard')
    const logoutLink = await findByText('Logout')

    expect(predictorLink).toBeInTheDocument()
    expect(dashboardLink).toBeInTheDocument()
    expect(logoutLink).toBeInTheDocument()
  })
})
