import { Badge, Divider, Paper, Table, Text } from "src/components/ui"
import MisplacementsProducts from "./MisplacementsProducts"
import { formatProducts } from "../utils/functions"
import ModalMisplacements from "./ModalMisplacements"
import { useModalMisplacements } from "../hooks/useModalMisplacements"

const MisplacementsTable = () => {


  return (
    <Paper>
      <Text size="lg" weight="500" color="gray_900">Extravios</Text>
      <Divider />
      <Table
        columns={[
          {
            label: 'Produtos',
            value: 'products',
            render: value => (
              <MisplacementsProducts products={formatProducts(value.toString())} />
            )
          },
          { label: 'Data', value: 'created_at' },
        ]}
        data={[]}
      />
    </Paper>
  )
}

export default MisplacementsTable