import { useMemo } from "react"
import { AxisOptions, Chart } from "react-charts"

const mockChartData = [
  { date: 1, invoicing: 38000 },
  { date: 2, invoicing: 32666 },
  { date: 3, invoicing: 40654 },
  { date: 4, invoicing: 63875 },
  { date: 5, invoicing: 15687 },
  { date: 6, invoicing: 58755 },
  { date: 7, invoicing: 36576 },
  { date: 8, invoicing: 87864 },
  { date: 9, invoicing: 10587 },
  { date: 10, invoicing: 10587 },
  { date: 11, invoicing: 10587 },
  { date: 12, invoicing: 10587 },
  { date: 13, invoicing: 10587 },
  { date: 14, invoicing: 10587 },
  { date: 15, invoicing: 10587 },
]

type DailyStars = {
  date: string,
  invoicing: number,
}

const MonthsInvoicingChart = () => {

  const data = [{
    label: 'teste',
    data: mockChartData,

  }]

  const primaryAxis = useMemo((): AxisOptions<DailyStars> => ({
    getValue: datum => datum.date,
  }), [])

  const secondaryAxes = useMemo((): AxisOptions<DailyStars>[] => [{
    getValue: datum => datum.invoicing,
    formatters: {
      tooltip: value => value?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
      scale: value => value?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
    },
    elementType: 'bar'
  }], [])

  return (
    <div style={{ height: 400 }}>
        <Chart options={{ data, primaryAxis, secondaryAxes, tooltip: false, dark: false,  }} />
      </div>
  )
}

export default MonthsInvoicingChart