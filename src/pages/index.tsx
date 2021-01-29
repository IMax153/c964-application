import { Flex, Heading, VStack } from '@chakra-ui/react'

import { LoginForm } from '../components/LoginForm'
import { PageLayout } from '../components/PageLayout'

const Home: React.FC = () => {
  return (
    <PageLayout>
      <Flex h="full" w="full" justify="center" bg="gray.300">
        <VStack mt="20rem" spacing={8}>
          <Heading as="h2" size="2xl">
            Welcome to the League of Legends Match Predictor
          </Heading>
          <VStack direction="column" shrink={1} spacing={4}>
            <Heading as="h3" size="md">
              All you need is your development token!
            </Heading>

            <LoginForm />
          </VStack>
        </VStack>
      </Flex>
    </PageLayout>
  )
}

export default Home
