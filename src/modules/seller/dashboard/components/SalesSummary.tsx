import { FC } from 'react'
import { Divider, Paper, Text } from "src/components/ui"

interface SalesSummaryProps {
  totalSalesMonth?: number
  totalSalesWeek?: number
  totalSalesDay?: number
}

const SalesSummary: FC<SalesSummaryProps> = ({
  totalSalesMonth = 0,
  totalSalesWeek = 0,
  totalSalesDay = 0,
}) => {

  return (
    <Paper>
      <Text size="xl" weight="600" color="gray_900">Total de vendas</Text>
      <Divider my={10} />

      <Paper color="indigo_600">
        <Text size="lg" weight="500" color="white">Está mês:</Text>
        <Divider />
        <Text color="white" size="xl" weight="600" full align="right">{totalSalesMonth}</Text>
      </Paper>

      <Divider />

      <Paper color="indigo_500">
        <Text size="lg" weight="500" color="white">Está semana:</Text>
        <Divider />
        <Text color="white" size="xl" weight="600" full align="right">{totalSalesWeek}</Text>
      </Paper>

      <Divider />

      <Paper color="blue_500">
        <Text size="lg" weight="500" color="white">Hoje:</Text>
        <Divider />
        <Text color="white" size="xl" weight="600" full align="right">{totalSalesDay}</Text>
      </Paper>

    </Paper>
  )
}

export default SalesSummary