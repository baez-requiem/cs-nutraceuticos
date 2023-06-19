import { Badge, Divider, Paper, Table, Text } from "src/components/ui"
import MisplacementsProducts from "./MisplacementsProducts"
import { formatProducts } from "../utils/functions"
import { useMisplacementsTable } from "../hooks/useMisplacementsTable"
import { formatUTCDateTime } from "src/utils/date.utils"

const MisplacementsTable = () => {

  const { misplacementsTableData } = useMisplacementsTable()

  return (
    <Paper>
      <Text size="lg" weight="500" color="gray_900">Extravios</Text>
      <Divider />
      <Table
        columns={[
          {
            label: '#',
            value: 'idx'
          },
          {
            label: 'Produtos',
            value: 'products',
            render: value => (
              <MisplacementsProducts products={formatProducts(value.toString())} />
            )
          },
          {
            label: 'Data',
            value: 'created_at',
            render: value => <Text>{formatUTCDateTime(value.toString())}</Text>
          },
        ]}
        data={misplacementsTableData}
      />
    </Paper>
  )
}

export default MisplacementsTable