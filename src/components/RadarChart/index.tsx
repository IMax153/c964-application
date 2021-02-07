import { Checkbox, CheckboxGroup, Grid, Heading, HStack } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RCRadarChart,
  ResponsiveContainer,
  ResponsiveContainerProps
} from 'recharts'

export interface RadarChartProps {
  readonly data: Array<Record<string, any>>
  readonly polarAngleKey: string
  readonly radars: ReadonlyArray<[key: string, color: string]>
  readonly title: string
  readonly containerProps?: Omit<ResponsiveContainerProps, 'children'>
}

export const RadarChart: React.FC<RadarChartProps> = ({
  containerProps,
  data,
  polarAngleKey,
  radars,
  title
}) => {
  const defaultValues = useMemo(() => radars.map(([key]) => key), [radars])

  const [checked, setChecked] = useState(defaultValues)

  const handleChange = (values: ReadonlyArray<any>) => setChecked([...values])

  return (
    <Grid h="full" w="full" templateRows="1fr 1fr 10fr" gap={2}>
      <Heading size="md" color="teal.500" mb={4} textAlign="center">
        {title}
      </Heading>

      <CheckboxGroup colorScheme="teal" defaultValue={defaultValues} onChange={handleChange}>
        <HStack justify="center">
          {radars.map(([key]) => (
            <Checkbox key={`radar-checkbox-key-${key}`} value={key}>
              {key}
            </Checkbox>
          ))}
        </HStack>
      </CheckboxGroup>

      <ResponsiveContainer {...containerProps}>
        <RCRadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey={polarAngleKey} />
          <PolarRadiusAxis />
          {radars
            .filter(([key]) => checked.includes(key))
            .map(([key, color]) => (
              <Radar
                key={`radar-chart-key-${key}`}
                dataKey={key}
                stroke={color}
                fill={color}
                fillOpacity={0.6}
              />
            ))}
          <Legend />
        </RCRadarChart>
      </ResponsiveContainer>
    </Grid>
  )
}
