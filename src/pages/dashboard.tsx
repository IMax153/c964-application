import { Grid, GridItem, Skeleton } from '@chakra-ui/react'
import * as d3 from 'd3'
import { identity } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import { useEffect, useMemo, useState } from 'react'

import { FrequencyChart } from '../components/FrequencyChart'
import { PageLayout } from '../components/PageLayout'
import { PieChart } from '../components/PieChart'
import { RadarChart } from '../components/RadarChart'
import { championOptions, getChampionById, getSpellById } from '../lib/data'
import { Match } from '../lib/types'

export interface DashboardProps {}

type MatchWithWinner = Match & { readonly winner: 0 | 1 }

const Dashboard: React.FC<DashboardProps> = () => {
  const [data, setData] = useState<d3.DSVParsedArray<MatchWithWinner>>(RA.empty as any)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    d3.csv<MatchWithWinner, string>('./matches.csv', d3.autoType).then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [])

  const pickedChampions = useMemo(
    () =>
      Array.from(
        d3.group(
          d3.merge(
            data.map((d) => [
              d['participant1.championId'],
              d['participant2.championId'],
              d['participant3.championId'],
              d['participant4.championId'],
              d['participant5.championId'],
              d['participant6.championId'],
              d['participant7.championId'],
              d['participant8.championId'],
              d['participant9.championId'],
              d['participant10.championId']
            ])
          ),
          identity
        ),
        ([id, values]) => ({ name: getChampionById(id as any), count: values.length })
      ),
    [data]
  )

  const bannedChampions = useMemo(
    () =>
      Array.from(
        d3.group(
          d3.merge(
            data.map((d) => [
              d['banned1.championId'],
              d['banned2.championId'],
              d['banned3.championId'],
              d['banned4.championId'],
              d['banned5.championId'],
              d['banned6.championId'],
              d['banned7.championId'],
              d['banned8.championId'],
              d['banned9.championId'],
              d['banned10.championId']
            ])
          ),
          identity
        ),
        ([id, values]) => ({ name: getChampionById(id as any), count: values.length })
      ),
    [data]
  )

  const summonerSpells = useMemo(() => {
    const spells = d3.merge(
      data.map((d) => [
        {
          spell1: getSpellById(d['participant1.spell1Id'] as any),
          spell2: getSpellById(d['participant1.spell2Id'] as any)
        },
        {
          spell1: getSpellById(d['participant2.spell1Id'] as any),
          spell2: getSpellById(d['participant2.spell2Id'] as any)
        },
        {
          spell1: getSpellById(d['participant3.spell1Id'] as any),
          spell2: getSpellById(d['participant3.spell2Id'] as any)
        },
        {
          spell1: getSpellById(d['participant4.spell1Id'] as any),
          spell2: getSpellById(d['participant4.spell2Id'] as any)
        },
        {
          spell1: getSpellById(d['participant5.spell1Id'] as any),
          spell2: getSpellById(d['participant5.spell2Id'] as any)
        },
        {
          spell1: getSpellById(d['participant6.spell1Id'] as any),
          spell2: getSpellById(d['participant6.spell2Id'] as any)
        },
        {
          spell1: getSpellById(d['participant7.spell1Id'] as any),
          spell2: getSpellById(d['participant7.spell2Id'] as any)
        },
        {
          spell1: getSpellById(d['participant8.spell1Id'] as any),
          spell2: getSpellById(d['participant8.spell2Id'] as any)
        },
        {
          spell1: getSpellById(d['participant9.spell1Id'] as any),
          spell2: getSpellById(d['participant9.spell2Id'] as any)
        },
        {
          spell1: getSpellById(d['participant10.spell1Id'] as any),
          spell2: getSpellById(d['participant10.spell2Id'] as any)
        }
      ])
    )

    const spell1Frequencies = Array.from(
      d3.rollup<{ spell1: string; spell2: string }, number, string>(
        spells as any,
        (group) => group.length,
        (group) => group.spell1
      )
    )

    const spell2Frequencies = Array.from(
      d3.rollup<{ spell1: string; spell2: string }, number, string>(
        spells as any,
        (group) => group.length,
        (group) => group.spell2
      )
    ).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Record<string, number>)

    const frequencyTable = spell1Frequencies.map(([name, spell1]) => ({
      name,
      spell1,
      spell2: spell2Frequencies[name]
    }))

    return frequencyTable
  }, [data])

  const winners = useMemo(
    () =>
      Array.from(d3.group(data, (d) => d.winner)).map(([team, wins]) => ({
        team: team === 0 ? 'Blue' : 'Red',
        wins: wins.length
      })),
    [data]
  )

  return (
    <PageLayout>
      <Grid h="full" w="full" py={10} templateColumns="1fr 10fr 1fr" gap={2} overflowY="scroll">
        <GridItem />

        <Grid templateColumns="repeat(2, 1fr)" templateRows="repeat(2, 1fr)" gap={2}>
          <GridItem bg="white" rounded="md" p={10} boxShadow="md">
            {loading ? (
              <Skeleton h="full" w="full" />
            ) : (
              <FrequencyChart
                id="banned-champions-frequency-chart"
                title="Frequency of Banned Champions by Name"
                filterPlaceholder="Select specific champions to display"
                filterOptions={championOptions}
                filterCompare={(record, selected) => record.name === selected.label}
                data={bannedChampions}
              />
            )}
          </GridItem>

          <GridItem bg="white" rounded="md" p={10} boxShadow="md">
            {loading ? (
              <Skeleton h="full" w="full" />
            ) : (
              <FrequencyChart
                id="picked-champions-frequency-chart"
                title="Frequency of Picked Champions by Name"
                filterPlaceholder="Select specific champions to display"
                filterOptions={championOptions}
                filterCompare={(record, selected) => record.name === selected.label}
                data={pickedChampions}
              />
            )}
          </GridItem>

          <GridItem bg="white" rounded="md" p={10} boxShadow="md">
            {loading ? (
              <Skeleton h="full" w="full" />
            ) : (
              <RadarChart
                polarAngleKey="name"
                radars={[
                  ['spell1', '#82ca9d'],
                  ['spell2', '#8884d8']
                ]}
                title="Distribution of Summoner Spells by Name"
                data={summonerSpells}
              />
            )}
          </GridItem>

          <GridItem bg="white" rounded="md" p={10} boxShadow="md">
            {loading ? (
              <Skeleton h="full" w="full" />
            ) : (
              <PieChart
                data={winners}
                indexKey="team"
                dataKey="wins"
                title="Distribution of Wins by Team"
              />
            )}
          </GridItem>
        </Grid>
      </Grid>

      <GridItem />
    </PageLayout>
  )
}

Dashboard.displayName = 'Dashboard'

export default Dashboard
