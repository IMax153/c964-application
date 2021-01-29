import type { IsAuthorized } from '../../lib/session'
import { validateSession, withSession } from '../../lib/session'

export default withSession<IsAuthorized>(async (req, res) => {
  const { token } = await req.body

  try {
    // If no token was specified, throw an error
    if (!token) throw new Error('Invalid development token')
    // Check if the provided token matches the secret development token
    const auth = await validateSession(token)
    // Set auth on the session to whatever was returned from validation
    req.session.set<IsAuthorized>('auth', auth)
    // Save the session
    await req.session.save()
    // Return the result of validation in the response body
    res.json(auth)
  } catch (error) {
    // Return 401 status code if error is thrown
    res.status(401)
  }
})
