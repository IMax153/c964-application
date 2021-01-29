import type { IsAuthorized } from '../../lib/session'
import { withSession } from '../../lib/session'

export default withSession<IsAuthorized>(async (req, res) => {
  const auth = req.session.get<IsAuthorized>('auth')

  if (auth) {
    res.json({
      isAuthorized: true
    })
  } else {
    res.json({
      isAuthorized: false
    })
  }
})
