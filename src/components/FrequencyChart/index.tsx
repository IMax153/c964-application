import { Center, Grid, Heading } from '@chakra-ui/react'
import * as d3 from 'd3'
import * as RA from 'fp-ts/ReadonlyArray'
import { useState } from 'react'
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  ResponsiveContainerProps,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import type { SelectOption } from '../Select'
import { Select } from '../Select'

export interface FrequencyChartProps {
  readonly data: Array<{ name: string; count: number }>
  readonly filterOptions: ReadonlyArray<SelectOption>
  readonly filterCompare: (a: Record<string, any>, b: SelectOption) => boolean
  readonly id: string
  readonly filterPlaceholder: string
  readonly title: string
  readonly containerProps?: Omit<ResponsiveContainerProps, 'children'>
}

export const FrequencyChart: React.FC<FrequencyChartProps> = ({
  containerProps,
  data,
  filterCompare,
  filterOptions,
  filterPlaceholder,
  id,
  title
}) => {
  const [filterTo, setFilterTo] = useState<ReadonlyArray<SelectOption>>(RA.empty)

  const handleChange = (values: ReadonlyArray<SelectOption>) => {
    setFilterTo([...values])
  }

  const filteredData = data.filter(
    (a) => RA.isEmpty(filterTo) || filterTo.some((b) => filterCompare(a, b))
  )

  const counts = d3.sort(filteredData, (d) => -d.count)

  return (
    <Grid h="full" w="full" templaterows="1fr 10fr 1 fr" gap={2}>
      <Heading size="md" color="teal.500" mb={4} textAlign="center">
        {title}
      </Heading>
      <ResponsiveContainer {...containerProps}>
        <BarChart data={counts}>
          <Brush dataKey="name" height={20} stroke="#8884d8" />
          <CartesianGrid />
          <XAxis dataKey="name" angle={-45} height={60} textAnchor="end" />
          <YAxis dataKey="count" />
          <Tooltip />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <Center display="block" w="full" pl={16}>
        <Select
          id={id}
          placeholder={filterPlaceholder}
          options={filterOptions}
          onChange={(values) => handleChange(values as ReadonlyArray<SelectOption>)}
          isMulti
          isSearchable
          isClearable
        />
      </Center>
    </Grid>
  )
}

FrequencyChart.displayName = 'FrequencyChart'
