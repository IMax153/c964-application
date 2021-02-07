import { Grid, Heading, Text } from '@chakra-ui/react'
import { useState } from 'react'
import {
  Pie,
  PieChart as RCPieChart,
  ResponsiveContainer,
  ResponsiveContainerProps,
  Sector
} from 'recharts'

export interface PieChartProps {
  readonly containerProps?: Omit<ResponsiveContainerProps, 'children'>
  readonly data: Array<Record<string, any>>
  readonly dataKey: string
  readonly indexKey: string
  readonly title: string
}

export interface ActivePieSliceProps {
  readonly cx: number
  readonly cy: number
  readonly endAngle: number
  readonly fill: string
  readonly indexKey: string
  readonly innerRadius: number
  readonly midAngle: number
  readonly outerRadius: number
  readonly payload: Record<string, any>
  readonly percent: number
  readonly startAngle: number
  readonly value: number
}

const ActivePieSlice: React.FC<ActivePieSliceProps> = ({
  cx,
  cy,
  endAngle,
  fill,
  indexKey,
  innerRadius,
  midAngle,
  outerRadius,
  payload,
  percent,
  startAngle,
  value
}) => {
  const RADIAN = Math.PI / 180
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload[indexKey]}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

export const PieChart: React.FC<PieChartProps> = ({
  containerProps,
  data,
  dataKey,
  indexKey,
  title
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  return (
    <Grid h="full" w="full" templateRows="1fr 10fr 1fr" gap={2}>
      <Heading size="md" color="teal.500" mb={4} textAlign="center">
        {title}
      </Heading>

      <ResponsiveContainer {...containerProps}>
        <RCPieChart>
          <Pie
            z={1}
            activeIndex={activeIndex}
            activeShape={((props: any) => <ActivePieSlice indexKey={indexKey} {...props} />) as any}
            data={data}
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            dataKey={dataKey}
            onClick={onPieEnter as any}
          />
        </RCPieChart>
      </ResponsiveContainer>

      <Text size="lg" textAlign="center">
        Click a slice to view additional details
      </Text>
    </Grid>
  )
}

PieChart.displayName = 'PieChart'
