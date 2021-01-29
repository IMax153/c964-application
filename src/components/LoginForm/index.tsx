import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  VStack
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { VscLock as LockIcon } from 'react-icons/vsc'
import { object, string } from 'yup'

import { useSession, useYupValidation } from '../../lib/hooks'
import { request } from '../../lib/remote'

export interface LoginFormProps {}

export interface LoginFormData {
  readonly token: string
}

const validationSchema = object({
  token: string().required('Please enter a valid development token')
})

export const LoginForm: React.FC<LoginFormProps> = () => {
  const toast = useToast()
  const resolver = useYupValidation(validationSchema)
  const { errors, formState, handleSubmit, register } = useForm<LoginFormData>({ resolver })

  const { mutateSession } = useSession({
    redirectTo: '/predictor',
    redirectIfAuthorized: true
  })

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    try {
      await mutateSession(
        request('api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
      )
    } catch (e) {
      toast({
        title: 'Internal server error',
        description: 'Sorry about that! Please refresh the page and try again',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  return (
    <Flex as="form" w="full" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.token)}>
        <VStack spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <LockIcon />
            </InputLeftElement>
            <Input
              variant="filled"
              name="token"
              type="password"
              placeholder="Paste your token here"
              ref={register}
            />
          </InputGroup>
          <FormErrorMessage>{errors.token?.message}</FormErrorMessage>
          <Button type="submit" isLoading={formState.isSubmitting} width="full">
            Get Started
          </Button>
        </VStack>
      </FormControl>
    </Flex>
  )
}

LoginForm.displayName = 'LoginForm'
