import { Box, Button, Grid, GridItem, Heading, Stack, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Prediction } from '../../lib/decoders'
import { useYupValidation } from '../../lib/hooks'
import { request } from '../../lib/remote'
import { MatchFormData } from '../../lib/types'
import { PredictionDialog } from '../PredictionDialog'
import { Team } from '../Team'
import { defaultValues } from './defaultValues'
import { validationSchema } from './validationSchema'

export interface MatchFormProps {}

export const MatchForm: React.FC<MatchFormProps> = () => {
  const toast = useToast()
  const resolver = useYupValidation(validationSchema)
  const methods = useForm<MatchFormData>({ defaultValues, resolver })
  const [prediction, setPrediction] = useState<Prediction | null>(null)

  const handleClose = () => setPrediction(null)

  const onSubmit = async (data: MatchFormData): Promise<void> => {
    try {
      const result: Prediction = await request('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      setPrediction(result)
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
    <>
      <PredictionDialog isOpen={!!prediction} onClose={handleClose} prediction={prediction} />

      <FormProvider {...methods}>
        <Grid h="full" w="full" py={10} templateColumns="1fr 10fr 1fr" gap={2}>
          <GridItem />

          <GridItem overflowY="scroll" bg="white" boxShadow="md" rounded="md">
            <Box as="form" h="full" w="full" onSubmit={methods.handleSubmit(onSubmit)}>
              <Grid h="full" w="full" templateColumns="4fr 1fr 4fr" gap={2} p="6">
                <GridItem>
                  <Team color="Red" />
                </GridItem>

                <GridItem display="flex" flexDir="column" justifyContent="center">
                  <Stack spacing={8}>
                    <Heading color="black" textAlign="center">
                      vs.
                    </Heading>
                    <Button type="submit" colorScheme="teal">
                      Predict
                    </Button>
                  </Stack>
                </GridItem>

                <GridItem>
                  <Team color="Blue" />
                </GridItem>
              </Grid>
            </Box>
          </GridItem>

          <GridItem />
        </Grid>
      </FormProvider>
    </>
  )
}

MatchForm.displayName = 'MatchForm'
