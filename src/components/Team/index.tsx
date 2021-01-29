import { Grid, GridItem, Heading } from '@chakra-ui/react'
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'

import { Summoner } from '../Summoner'

export interface TeamProps {
  readonly color: 'Red' | 'Blue'
}

export const Team: React.FC<TeamProps> = ({ color }) => {
  const start = color === 'Red' ? 1 : 6
  const end = color === 'Red' ? 5 : 10

  return (
    <Grid h="full" w="full" templateRows="0.5fr 10fr">
      <GridItem>
        <Heading colorScheme="red" pl={4}>
          {color} Team
        </Heading>
      </GridItem>
      <GridItem border="1px" borderColor="gray.400" pr={2} rounded="md">
        <Grid h="full" w="full" templateRows="repeat(5, 1fr)" gap={1}>
          {pipe(
            RA.range(start, end),
            RA.map((id) => (
              <GridItem
                key={`summoner-${id}`}
                borderTop={id === start ? '' : '1px'}
                borderColor="gray.400"
              >
                <Summoner identifier={id} />
              </GridItem>
            ))
          )}
        </Grid>
      </GridItem>
    </Grid>
  )
}

Team.displayName = 'Team'
