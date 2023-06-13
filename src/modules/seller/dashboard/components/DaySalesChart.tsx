import { useMemo } from "react"
import { AxisOptions, Chart } from "react-charts"
import { Divider, Paper, Text } from "src/components/ui"

const mockChartData = [
  { date: 1, invoicing: 38 },
  { date: 2, invoicing: 72 },
  { date: 3, invoicing: 100 },
  { date: 4, invoicing: 163 },
  { date: 5, invoicing: 195 },
  { date: 6, invoicing: 258 },
  { date: 7, invoicing: 286 },
]

type DailyStars = {
  date: number,
  invoicing: number,
}

const DaySalesChart = () => {

  const data = [{
    data: mockChartData,
  }]

  const primaryAxis = useMemo((): AxisOptions<DailyStars> => ({
    getValue: datum => datum.date,
    tickCount: 7,
    formatters: {
      scale: value => value + '/05'
    }
  }), [])

  const secondaryAxes = useMemo((): AxisOptions<DailyStars>[] => [{
    getValue: datum => datum.invoicing,
  }], [])

  return (
    <Paper>
      <Text size="xl" weight="600" color="gray_900">Qtd. Vendas - 01 de janeiro até 07 de janeiro</Text>
      <Divider my={10} />
      <div style={{ height: 200 }}>
        <Chart options={{ data, primaryAxis, secondaryAxes, tooltip: false, dark: false  }} />
      </div>
    </Paper>
  )
}

export default DaySalesChart