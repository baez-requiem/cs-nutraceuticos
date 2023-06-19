import { Button, Divider, Flex, Grid, Paper, Private, Text } from "src/components/ui"

import { BatchesTable, ModalBatch, StockTable } from "./components"
import { useStock } from "./hooks/useStock"
import MisplacementsTable from "./components/MisplacementsTable"

const Stock = () => {

  const {
    closeModal,
    openModal,
    useModal,
  } = useStock()

  return (
    <Private>
      <Text size="xl2" weight="600" color="gray_900">Estoque</Text>
      <Divider my={10} />

      <Paper>
        <Flex items="end" justify="space-between">
          <Flex items="end" gap={10}>
            <Button size="sm" color="green_600" onClick={() => openModal('newBatch')}>Novo lote</Button>
            <Button size="sm" color="red_600" onClick={() => {}}>Registrar extravio</Button>
          </Flex>
        </Flex>
      </Paper>

      <Divider my={10} />

      <Grid template="1fr 1fr" gap={20}>
        <StockTable />

        <MisplacementsTable />
      </Grid>

      <Divider my={10} />

     
      <BatchesTable />

      <ModalBatch
        show={useModal.opened == 'newBatch'}
        onClose={closeModal}
      />
    </Private>
  )
}

export default Stock