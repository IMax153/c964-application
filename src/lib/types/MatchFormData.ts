import type { SelectOption } from '../../components/Select'

export interface BannedChampion {
  champion: SelectOption
}

export interface Participant {
  champion: SelectOption
  spell1: SelectOption
  spell2: SelectOption
  championSpecificWinRate: string
}

export interface MatchFormData {
  banned1: BannedChampion
  banned2: BannedChampion
  banned3: BannedChampion
  banned4: BannedChampion
  banned5: BannedChampion
  banned6: BannedChampion
  banned7: BannedChampion
  banned8: BannedChampion
  banned9: BannedChampion
  banned10: BannedChampion
  participant1: Participant
  participant2: Participant
  participant3: Participant
  participant4: Participant
  participant5: Participant
  participant6: Participant
  participant7: Participant
  participant8: Participant
  participant9: Participant
  participant10: Participant
}
