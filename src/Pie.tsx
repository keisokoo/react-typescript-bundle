import React from 'react'
import { PieChart, Pie, Cell, Label } from 'recharts'

const data = [
  { name: 'Group A', value: 13 },
  { name: 'Group B', value: 29 },
  { name: 'Group C', value: 43 },
]

const COLORS = ['#d3d3d3', '#17BAB0', '#007E86']
const PieComponent = () => {
  return (
    <PieChart width={800} height={400}>
      <Pie
        data={data}
        cx={120}
        stroke="none"
        cy={200}
        innerRadius={60}
        outerRadius={80}
        startAngle={20}
        endAngle={-340}
        cornerRadius={100}
        fill="#8884d8"
        paddingAngle={-10}
        labelLine={false}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        <Label
          content={(props: any) => {
            const {
              viewBox: { cx, cy },
            } = props
            const positioningPropsOne = {
              y: cy - 8,
              fill: '#AAB2C0',
            }
            const positioningPropsTwo = {
              y: cy + 16,
              fill: '#51565E',
            }
            const commonProps = {
              x: cx,
              textAnchor: 'middle',
            }

            return (
              <>
                <text
                  {...positioningPropsOne}
                  {...commonProps}
                  className={'bolder'}
                >
                  총
                </text>
                <text
                  {...positioningPropsTwo}
                  {...commonProps}
                  className={'bolder'}
                >
                  {new Intl.NumberFormat('ko-KR').format(10000)} 건
                </text>
              </>
            )
          }}
        />
      </Pie>
    </PieChart>
  )
}
export default PieComponent
