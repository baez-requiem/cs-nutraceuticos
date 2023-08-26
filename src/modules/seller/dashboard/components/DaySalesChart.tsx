import { useMemo } from "react"
import { AxisOptions, Chart } from "react-charts"
import { Divider, Paper, Text } from "src/components/ui"

type DailyStars = {
  label: string,
  value: number,
}

const DaySalesChart = ({ data = [{ label: '', value:0 }] }) => {

  const chartData = [{
    data: data,
  }]

  const primaryAxis = useMemo((): AxisOptions<DailyStars> => ({
    getValue: datum => datum.label,
    tickCount: 7,
  }), [])

  const secondaryAxes = useMemo((): AxisOptions<DailyStars>[] => [{
    getValue: datum => datum.value,
  }], [])

  return (
    <Paper>
      <Text size="xl" weight="600" color="gray_900">Qtd. Vendas - 01 de janeiro até 07 de janeiro</Text>
      <Divider my={10} />
      <div style={{ height: 260 }}>
        <Chart options={{ data: chartData, primaryAxis, secondaryAxes, tooltip: false, dark: false  }} />
      </div>
    </Paper>
  )
}

export default DaySalesChart