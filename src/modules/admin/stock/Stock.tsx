import { Badge, Button, Divider, Flex, IconButton, Paper, Private, SideFilters, Table, Text } from "src/components/ui"

import { ModalBatch } from "./components"
import { useStock } from "./hooks/useStock"

const Stock = () => {

  const { closeModal, openModal, useModal } = useStock()

  return (
    <Private>
      <Text size="xl2" weight="600" color="gray_900">Estoque</Text>
      <Divider my={10} />

      <Paper>
        <Flex items="end" justify="space-between">
          <Flex items="end" gap={10}>
            <Button size="sm" color="green_600" onClick={() => openModal('newBatch')}>Novo lote</Button>
            <Button size="sm" color="sky_600" onClick={() => {}}>Ajustar lotes</Button>
            <Button size="sm" color="red_600" onClick={() => {}}>Registrar extravio</Button>
          </Flex>

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
            { label: 'Status', value: 'active', render: value => (
              <Badge color={value == 1 ? 'green_600' : 'gray_500'}>{value == 1 ? 'Ativo' : 'desativado'}</Badge>
            ) },
          ]}
          data={[
            { id: 1, product: 'VIAGRA CPS', quantity: '987', note: 'Anotação...', active: 1 },
            { id: 2, product: 'VITA GOLD', quantity: '0', note: 'Anotação...', active: 1 },
            { id: 3, product: 'BEAUTY CAPS', quantity: '80', note: 'Anotação...', active: 0 },
          ]}
        />
      </Paper>

      <ModalBatch
        show={useModal.opened == 'newBatch'}
        onClose={closeModal}
      />
    </Private>
  )
}

export default Stock