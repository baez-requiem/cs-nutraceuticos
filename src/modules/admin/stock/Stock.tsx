import { Badge, Button, Divider, Flex, IconButton, Paper, Private, SideFilters, Table, Text } from "src/components/ui"

import { BatchesProducts, ModalBatch } from "./components"
import { useStock } from "./hooks/useStock"
import { formatUTCDate, formatUTCDateTime } from "src/utils/date.utils"
import { formatProducts } from "./utils/functions"
import { floatToReal } from "src/utils/number.utils"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { BsTrash } from "react-icons/bs"

const Stock = () => {

  const {
    closeModal,
    openModal,
    useModal,
    stockProducts,
    batchesTableData
  } = useStock()

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
            { label: 'Lote', value: 'idx' },
            {
              label: 'Produtos',
              value: 'products',
              render: value => <BatchesProducts products={formatProducts(value.toString())} />
            },
            {
              label: 'Frete',
              value: 'shipping',
              align: 'right',
              render: value => <Text align="right" full>R$ {floatToReal(parseFloat(value.toString()))}</Text>
            },
            {
              label: 'Data',
              value: 'created_at',
              render: value => <Text>{formatUTCDateTime(value.toString())}</Text>
            },
            { label: 'Anotações', value: 'notes' },
            {
              label: 'Ações',
              value: 'id',
              align: 'center',
              render: value => (
                <Flex justify="center" gap={10}>
                  <IconButton color="blue_600" onClick={() => {}}>
                    <MdOutlineModeEditOutline color="white" size={20} />
                  </IconButton>
                  <IconButton color="red_600" onClick={() => {}}>
                    <BsTrash color="white" size={18} />
                  </IconButton>
                </Flex>
              )
            }
          ]}
          data={batchesTableData}
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