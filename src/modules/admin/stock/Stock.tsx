import { Button, Divider, Flex, IconButton, Paper, Private, SideFilters, Table, Text } from "src/components/ui"

import { BsTrash } from "react-icons/bs"
import { MdOutlineModeEditOutline } from "react-icons/md"
import ModalStock from "./ModalStock"

const Stock = () => {

  return (
    <Private>
      <Text size="xl2" weight="600" color="gray_900">Estoque</Text>
      <Divider my={10} />

      <Paper>
        <Flex items="end" justify="space-between">
          <Button size="sm" color="green_600" onClick={() => {}}>Ajustar estoque</Button>

          <SideFilters>

          </SideFilters>
        </Flex>
      </Paper>

      <Divider my={10} />

      <Paper>
        <Table
          columns={[
            { label: 'ID', value: 'id' },
            { label: 'Produto', value: 'product' },
            { label: 'Estoque disponível', value: 'quantity' },
          ]}
          data={[
            { id: 1, product: 'VIAGRA CPS', quantity: '987', note: 'Anotação...' },
            { id: 2, product: 'VITA GOLD', quantity: '0', note: 'Anotação...' },
            { id: 3, product: 'BEAUTY CAPS', quantity: '80', note: 'Anotação...' },
          ]}
        />
      </Paper>

      {/* <ModalStock show onClose={() => {}} /> */}
    </Private>
  )
}

export default Stock