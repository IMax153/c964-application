import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'

import { render } from '../../lib/test-utils'
import { LoginForm } from './index'

describe('LoginForm', () => {
  it('should attempt user login on valid form submission', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<LoginForm />)

    const loginButton = getByText('Get Started')
    const tokenInput = getByPlaceholderText('Paste your token here')

    userEvent.type(tokenInput, process.env.SECRET_DEVELOPMENT_TOKEN || '')
    userEvent.click(loginButton)

    const errorMessage = queryByText('Please enter a valid development token')

    expect(errorMessage).not.toBeInTheDocument()

    expect(fetchMock.mock.calls).toHaveLength(1)
    expect(fetchMock.mock.calls[0][0]).toBe('/api/session')
  })

  it('should show an error on invalid form submission', async () => {
    const { findByText, getByText } = render(<LoginForm />)

    const loginButton = getByText('Get Started')

    userEvent.click(loginButton)

    const errorMessage = await findByText('Please enter a valid development token')

    expect(errorMessage).toBeInTheDocument()
  })
})
