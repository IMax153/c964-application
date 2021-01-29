import type { IsAuthorized } from '../../lib/session'
import { withSession } from '../../lib/session'

export default withSession<IsAuthorized>((req, res) => {
  // Destroy the current user's session
  req.session.destroy()
  res.status(200).end()
})
