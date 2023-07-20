import { Divider, Flex, IconButton, Paper, Table, Text } from "src/components/ui"
import MisplacementsProducts from "./MisplacementsProducts"
import { formatProducts } from "../utils/functions"
import { formatUTCDateTime } from "src/utils/date.utils"
import { useMisplacementsTable } from "../hooks/useMisplacementsTable"
import { BsTrash } from "react-icons/bs"

const MisplacementsTable = () => {

  const {
    misplacementsTableData,
    deleteMisplacement
  } = useMisplacementsTable()

  return (
    <Paper>
      <Text size="lg" weight="500" color="gray_900">Extravios</Text>
      <Divider />
      <Table
        rows={5}
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
          {
            label: 'Ações',
            value: 'id',
            render: value => (
              <Flex justify="center">
                <IconButton color="red_600" onClick={deleteMisplacement(value.toString())}>
                  <BsTrash color="white" size={18} />
                </IconButton>
              </Flex>
            )
          }
        ]}
        data={misplacementsTableData}
      />
    </Paper>
  )
}

export default MisplacementsTable