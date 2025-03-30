import type React from "react"

interface ChartProps {
  data: { name: string; value: number }[]
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showYAxis?: boolean
  showXAxis?: boolean
  yAxisWidth?: number
  layout?: "vertical" | "horizontal"
  category?: string
  index?: string
}

export const BarChart: React.FC<ChartProps> = ({
  data,
  categories,
  colors,
  valueFormatter,
  showLegend,
  showYAxis,
  showXAxis,
  layout,
}) => {
  return (
    <div>
      {/* Bar Chart Placeholder */}
      <div>
        BarChart -{" "}
        {JSON.stringify({ data, categories, colors, valueFormatter, showLegend, showYAxis, showXAxis, layout })}
      </div>
    </div>
  )
}

export const LineChart: React.FC<ChartProps> = ({
  data,
  categories,
  colors,
  valueFormatter,
  showLegend,
  yAxisWidth,
}) => {
  return (
    <div>
      {/* Line Chart Placeholder */}
      <div>LineChart - {JSON.stringify({ data, categories, colors, valueFormatter, showLegend, yAxisWidth })}</div>
    </div>
  )
}

export const PieChart: React.FC<ChartProps> = ({ data, category, index, valueFormatter, colors }) => {
  return (
    <div>
      {/* Pie Chart Placeholder */}
      <div>PieChart - {JSON.stringify({ data, category, index, valueFormatter, colors })}</div>
    </div>
  )
}

