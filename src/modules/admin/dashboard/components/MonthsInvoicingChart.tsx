import { useMemo } from "react"
import { AxisOptions, Chart } from "react-charts"
import { Divider, Paper, Text } from "src/components/ui"

import { useQuery } from "react-query"
import { dashboardApi } from "src/services/api"
import { DayItemType } from "src/services/api/dashboard/dashboard.types"

const mounth = (new Date().getMonth() + 1).toString().padStart(2, '0')
const year = new Date().getUTCFullYear()

const MonthsInvoicingChart = () => {

  const { data: monthStatisticsResume } = useQuery(
    'dashboard/month-statistics-resume',
    dashboardApi.getMonthStatisticsResume,
    { refetchInterval: 10000, initialData: [{ day: 1, amount: 0 }] }
  )

  const data = [{
    data: monthStatisticsResume.length ? monthStatisticsResume : [{ day: 1, amount: 0 }]
  }]

  const primaryAxis = useMemo((): AxisOptions<DayItemType> => ({
    getValue: datum => datum.day,
    formatters: {
      scale: value => `${value?.toString().padStart(2, '0')}`,
    },
    hardMin: 1,
    tickCount: monthStatisticsResume.length,
    scaleType: 'linear'
  }), [])

  const secondaryAxes = useMemo((): AxisOptions<DayItemType>[] => [{
    getValue: datum => datum.amount,
    formatters: {
      tooltip: value => value?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
      scale: value => value?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
    },
  }], [])

  return (
    <Paper>
      <Text size="xl" weight="600" color="gray_900">Receita {mounth}/{year}</Text>
      <Divider my={10} />
      <div style={{ height: 350 }}>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            tooltip: false,
            dark: false,
          }}
        />
      </div>
    </Paper>
  )
}

export default MonthsInvoicingChart