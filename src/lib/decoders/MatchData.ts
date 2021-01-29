import { pipe } from 'fp-ts/function'
import type { TaskDecoder } from 'io-ts/TaskDecoder'
import * as TD from 'io-ts/TaskDecoder'

import type { SelectOption } from '../types'
import { Integer } from './Integer'
import { NumberFromString } from './NumberFromString'

export interface MatchParticipant {
  champion: Integer
  spell1: Integer
  spell2: Integer
  championSpecificWinRate: number
}

const IntegerFromString: TaskDecoder<unknown, Integer> = pipe(NumberFromString, TD.compose(Integer))

const SelectOptionDecoder: TaskDecoder<unknown, SelectOption> = TD.type({
  label: TD.string,
  value: TD.string
})

const SelectOptionToChampionId: TaskDecoder<unknown, Integer> = pipe(
  SelectOptionDecoder,
  TD.map(({ value }) => value),
  TD.compose(IntegerFromString)
)

const SelectOptionToSpell1Id: TaskDecoder<unknown, Integer> = pipe(
  SelectOptionDecoder,
  TD.map(({ value }) => value),
  TD.compose(IntegerFromString)
)

const SelectOptionToSpell2Id: TaskDecoder<unknown, Integer> = pipe(
  SelectOptionDecoder,
  TD.map(({ value }) => value),
  TD.compose(IntegerFromString)
)

const Participant: TaskDecoder<unknown, MatchParticipant> = TD.type({
  champion: SelectOptionToChampionId,
  spell1: SelectOptionToSpell1Id,
  spell2: SelectOptionToSpell2Id,
  championSpecificWinRate: pipe(
    NumberFromString,
    TD.map((n) => n / 100 + 0.001)
  )
})

export const MatchData = TD.type({
  banned1: TD.type({ champion: SelectOptionToChampionId }),
  banned2: TD.type({ champion: SelectOptionToChampionId }),
  banned3: TD.type({ champion: SelectOptionToChampionId }),
  banned4: TD.type({ champion: SelectOptionToChampionId }),
  banned5: TD.type({ champion: SelectOptionToChampionId }),
  banned6: TD.type({ champion: SelectOptionToChampionId }),
  banned7: TD.type({ champion: SelectOptionToChampionId }),
  banned8: TD.type({ champion: SelectOptionToChampionId }),
  banned9: TD.type({ champion: SelectOptionToChampionId }),
  banned10: TD.type({ champion: SelectOptionToChampionId }),
  participant1: Participant,
  participant2: Participant,
  participant3: Participant,
  participant4: Participant,
  participant5: Participant,
  participant6: Participant,
  participant7: Participant,
  participant8: Participant,
  participant9: Participant,
  participant10: Participant
})

export type MatchData = TD.TypeOf<typeof MatchData>
