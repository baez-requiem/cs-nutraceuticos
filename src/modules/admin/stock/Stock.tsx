import { Button, Divider, Flex, Grid, Paper, Private, Text } from "src/components/ui"

import { BatchesTable, ModalBatch, StockTable } from "./components"
import { useStock } from "./hooks/useStock"
import MisplacementsTable from "./components/MisplacementsTable"
import ModalMisplacements from "./components/ModalMisplacements"
import { Header } from "src/components/template"

const Stock = () => {

  const {
    closeModal,
    openModal,
    useModal,
  } = useStock()

  return (
    <Private>
      <Header title="Estoque" />
      <Divider my={10} />

      <Paper>
        <Flex items="end" justify="space-between">
          <Flex items="end" gap={10}>
            <Button size="sm" color="green_600" onClick={() => openModal('newBatch')}>Novo lote</Button>
            <Button size="sm" color="red_600" onClick={() => openModal('newMisplacement')}>Registrar extravio</Button>
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

      <ModalMisplacements
        show={useModal.opened == 'newMisplacement'}
        onClose={closeModal}
      />

      <ModalBatch
        show={useModal.opened == 'newBatch'}
        onClose={closeModal}
      />
    </Private>
  )
}

export default Stock