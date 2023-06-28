import { Badge, Divider, Paper, Table, Text } from "src/components/ui"
import { useStockTable } from "../hooks/useStockTable"
import { statusVariations } from "../constants"

const StockTable = () => {

  const { tableData } = useStockTable()

  return (
    <Paper>
      <Text size="lg" weight="500" color="gray_900">Estoque disponível</Text>
      <Divider />
      <Table
        columns={[
          { label: 'Produto', value: 'name' },
          { label: 'Estoque disponível', value: 'total' },
          { label: 'Status', value: 'status', render: value => (
            <Badge color={statusVariations[value].color}>{value}</Badge>
          ) },
        ]}
        data={tableData}
      />
    </Paper>
  )
}

export default StockTable