import { Badge, Button, Divider, Flex, IconButton, Paper, Private, SideFilters, Table, Text } from "src/components/ui"

import { ModalBatch } from "./components"
import { useStock } from "./hooks/useStock"

const Stock = () => {

  const { closeModal, openModal, useModal, stockProducts } = useStock()

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
        </Flex>
      </Paper>

      <Divider my={10} />

      <Paper>
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

      <Divider my={10} />

      <Paper>
        <Text size="lg" weight="500" color="gray_900">Lotes Cadastrados</Text>
        
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

      <ModalBatch
        show={useModal.opened == 'newBatch'}
        onClose={closeModal}
      />
    </Private>
  )
}

export default Stock