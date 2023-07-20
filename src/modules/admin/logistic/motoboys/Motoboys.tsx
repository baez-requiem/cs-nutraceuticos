import { Header } from "src/components/template"
import { Button, Flex, Grid, IconButton, Input, Paper, Private, Select, SideFilters, Table, TableActions } from "src/components/ui"
import { useMotoboys } from "./hooks/useMotoboys"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { BsTrash } from "react-icons/bs"
import { ModalMotoboy } from "./components"

export const Motoboys = () => {

  const {
    tableData,
    closeModal,
    useModal,
    openModal
  } = useMotoboys()

  return (
    <Private roles={['Admin']} logout>
      <Grid gap={20}>
        <Header title="Motoboys" subtitle="Logística" />

        <Paper>
          <Button color="green_600" onClick={openModal()}>
            Cadastrar motoboy
          </Button>
        </Paper>

        <Paper>
          <Table
            columns={[
              { label: 'Nome', value: 'name' },
              { label: 'Status', value: 'status' },
              { label: 'Ações', value: 'id', align: 'center', render: value => (
                <TableActions
                  actions={[
                    { type: 'Edit' },
                    { type: 'Delete' },
                  ]}
                />
              ) },
            ]}
            data={tableData}
          />
        </Paper>
      </Grid>

      <ModalMotoboy show={useModal.show} data={useModal.data} onClose={closeModal} />
    </Private>
  )
}

export default Motoboys