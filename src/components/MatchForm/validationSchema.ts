import { object, string } from 'yup'

const requiredString = string().required('Required')

const selectOption = object().shape({
  label: requiredString,
  value: requiredString
})

const bannedChampion = object().shape({
  champion: object().shape({
    label: string().default(() => '-1'),
    value: string().default(() => '-1')
  })
})

const participant = object().shape({
  champion: selectOption,
  spell1: selectOption,
  spell2: selectOption,
  championSpecificWinRate: requiredString
})

export const validationSchema = object().shape({
  banned1: bannedChampion,
  banned2: bannedChampion,
  banned3: bannedChampion,
  banned4: bannedChampion,
  banned5: bannedChampion,
  banned6: bannedChampion,
  banned7: bannedChampion,
  banned8: bannedChampion,
  banned9: bannedChampion,
  banned10: bannedChampion,
  participant1: participant,
  participant2: participant,
  participant3: participant,
  participant4: participant,
  participant5: participant,
  participant6: participant,
  participant7: participant,
  participant8: participant,
  participant9: participant,
  participant10: participant
})
