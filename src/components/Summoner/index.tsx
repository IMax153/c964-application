import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Stack
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { championOptions, spellOptions } from '../../lib/data'
import { ControlledSelect } from '../ControlledSelect'
import type { SelectOption } from '../Select'

export interface SummonerProps {
  readonly identifier: number
}

const hasSelectError = (field?: { type: string; message?: string }): boolean => {
  return field?.type !== 'typeError' && typeof field?.message !== 'undefined'
}

const getChampionFieldName = (identifier: number): string => `participant${identifier}.champion`

const getBannedFieldName = (identifier: number): string => `banned${identifier}.champion`

const getWinRateFieldName = (identifier: number): string =>
  `participant${identifier}.championSpecificWinRate`

const getSpellFieldName = (identifier: number, n: number): string =>
  `participant${identifier}.spell${n}`

const getChampionImageSrc = (name: string): string =>
  `https://ddragon.leagueoflegends.com/cdn/11.2.1/img/champion/${
    name === 'Wukong' ? 'MonkeyKing' : name
  }.png`

export const Summoner: React.FC<SummonerProps> = ({ identifier }) => {
  const { control, errors, register } = useFormContext()
  const championFieldName = useMemo(() => getChampionFieldName(identifier), [identifier])
  const bannedFieldName = useMemo(() => getBannedFieldName(identifier), [identifier])
  const winRateFieldName = useMemo(() => getWinRateFieldName(identifier), [identifier])
  const spell1FieldName = useMemo(() => getSpellFieldName(identifier, 1), [identifier])
  const spell2FieldName = useMemo(() => getSpellFieldName(identifier, 2), [identifier])

  const selectedChampion = useWatch<SelectOption>({ control, name: championFieldName })

  return (
    <Grid h="full" w="full" my={2} templateColumns="1.5fr 2fr 2fr 2fr" gap={2}>
      <Center>
        {selectedChampion?.value ? (
          <Image
            rounded="md"
            boxSize="150px"
            src={getChampionImageSrc(selectedChampion.label)}
            alt={selectedChampion.label}
          />
        ) : (
          <Image
            rouned="md"
            boxSize="150px"
            fallbackSrc="https://via.placeholder.com/150x150.png?text=Unselected"
            alt="Unselected Champion"
          />
        )}
      </Center>
      <Center>
        <Stack flex="1" spacing={2}>
          <Box>
            <FormControl isInvalid={hasSelectError(errors[`${championFieldName}.value`])}>
              <FormLabel htmlFor={championFieldName}>Champion</FormLabel>
              <ControlledSelect
                name={championFieldName}
                options={championOptions}
                isInvalid={hasSelectError(errors[`${championFieldName}.value`])}
                searchable
                clearable
              />
              <FormErrorMessage>{errors[`${championFieldName}.value`]?.message}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl isInvalid={errors[winRateFieldName]}>
              <FormLabel htmlFor={winRateFieldName}>Champion-Specific Win Rate</FormLabel>
              <InputGroup bg="white">
                <Input
                  name={winRateFieldName}
                  placeholder="Win rate"
                  variant="outline"
                  ref={register}
                />
                <InputRightAddon>%</InputRightAddon>
              </InputGroup>
              <FormErrorMessage>{errors[winRateFieldName]?.message}</FormErrorMessage>
            </FormControl>
          </Box>
        </Stack>
      </Center>
      <Center>
        <Stack flex="1" spacing={2}>
          <Box>
            <FormControl isInvalid={hasSelectError(errors[`${spell1FieldName}.value`])}>
              <FormLabel htmlFor={spell1FieldName}>Spell 1</FormLabel>
              <ControlledSelect
                name={spell1FieldName}
                options={spellOptions}
                isInvalid={hasSelectError(errors[`${spell1FieldName}.value`])}
                searchable
                clearable
              />
              <FormErrorMessage>{errors[`${spell1FieldName}.value`]?.message}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl isInvalid={hasSelectError(errors[`${spell2FieldName}.value`])}>
              <FormLabel htmlFor={spell2FieldName}>Spell 2</FormLabel>
              <ControlledSelect
                name={spell2FieldName}
                options={spellOptions}
                isInvalid={hasSelectError(errors[`${spell2FieldName}.value`])}
                searchable
                clearable
              />
              <FormErrorMessage>{errors[`${spell2FieldName}.value`]?.message}</FormErrorMessage>
            </FormControl>
          </Box>
        </Stack>
      </Center>
      <Center>
        <Stack flex="1" spacing={2}>
          <FormControl isInvalid={hasSelectError(errors[`${bannedFieldName}.value`])}>
            <FormLabel htmlFor={bannedFieldName}>Banned Champion</FormLabel>
            <ControlledSelect
              name={bannedFieldName}
              options={championOptions}
              isInvalid={hasSelectError(errors[`${bannedFieldName}.value`])}
              searchable
              clearable
            />
            <FormErrorMessage>{errors[`${bannedFieldName}.value`]?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
      </Center>
    </Grid>
  )
}

Summoner.displayName = 'Summoner'
