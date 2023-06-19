import { Badge, Divider, Paper, Table, Text } from "src/components/ui"
import { useStockTable } from "../hooks/useStockTable"

const StockTable = () => {

  const { stockProducts } = useStockTable()

  return (
    <Paper>
      <Text size="lg" weight="500" color="gray_900">Estoque disponível</Text>
      <Divider />
      <Table
        columns={[
          { label: 'Produto', value: 'name' },
          { label: 'Estoque disponível', value: 'quantity' },
          { label: 'Status', value: 'active', render: value => (
            <Badge color={value == 1 ? 'green_600' : 'gray_500'}>{value == 1 ? 'Ativo' : 'desativado'}</Badge>
          ) },
        ]}
        data={stockProducts.map(sp => ({ ...sp, active: +sp.active }))}
      />
    </Paper>
  )
}

export default StockTable