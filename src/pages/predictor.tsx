import { GetServerSideProps } from 'next'

import { MatchForm } from '../components/MatchForm'
import { PageLayout } from '../components/PageLayout'
import { IsAuthorized, withSession } from '../lib/session'

const Predictor: React.FC<IsAuthorized> = () => {
  return (
    <PageLayout>
      <MatchForm />
    </PageLayout>
  )
}

export const getServerSideProps = withSession<GetServerSideProps>(async ({ req }) => {
  const auth = (req as any).session.get('auth')

  if (!auth || !auth.isAuthorized) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: auth
  }
})

Predictor.displayName = 'Predictor'

export default Predictor
