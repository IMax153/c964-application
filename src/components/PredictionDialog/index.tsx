import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react'
import type { FocusableElement } from '@chakra-ui/utils'
import { useRef } from 'react'

import { Prediction } from '../../lib/decoders'

export interface PredictionDialogProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly prediction: Prediction | null
}

export const PredictionDialog: React.FC<PredictionDialogProps> = ({
  isOpen,
  onClose,
  prediction
}) => {
  const cancelRef = useRef<(FocusableElement & HTMLButtonElement) | null>(null)

  return (
    <>
      <AlertDialog
        motionPreset="scale"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Match Prediction
            </AlertDialogHeader>

            <AlertDialogBody>
              The predicted winner of the match is the {prediction?.predictedWinner} Team!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

PredictionDialog.displayName = 'PredictionDialog'
