import { useMemo } from "react"
import { AxisOptions, Chart } from "react-charts"
import { Divider, Paper, Text } from "src/components/ui"

const mockChartData = [
  { date: 1, invoicing: 38000 },
  { date: 2, invoicing: 72666 },
  { date: 3, invoicing: 100654 },
  { date: 4, invoicing: 163875 },
  { date: 5, invoicing: 195687 },
  { date: 6, invoicing: 258755 },
  { date: 7, invoicing: 286576 },
  { date: 8, invoicing: 287864 },
  { date: 9, invoicing: 310587 },
  { date: 10, invoicing: 340587 },
  { date: 11, invoicing: 360587 },
  { date: 12, invoicing: 380587 },
  { date: 13, invoicing: 410587 },
  { date: 14, invoicing: 440587 },
  { date: 15, invoicing: 470587 },
]

type DailyStars = {
  date: number,
  invoicing: number,
}

const MonthsInvoicingChart = () => {

  const data = [{
    data: mockChartData,
  }]

  const primaryAxis = useMemo((): AxisOptions<DailyStars> => ({
    getValue: datum => datum.date,
    formatters: {
      scale: value => value + '/05'
    }
  }), [])

  const secondaryAxes = useMemo((): AxisOptions<DailyStars>[] => [{
    getValue: datum => datum.invoicing,
    formatters: {
      tooltip: value => value?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
      scale: value => value?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
    },
    // elementType: 'bar'
  }], [])

  return (
    <Paper>
      <Text size="xl" weight="600" color="rgb(8, 47, 73)">Receita 05/2023</Text>
      <Divider my={10} />
      <div style={{ height: 200 }}>
          <Chart options={{ data, primaryAxis, secondaryAxes, tooltip: false, dark: false,  }} />
        </div>
    </Paper>
  )
}

export default MonthsInvoicingChart