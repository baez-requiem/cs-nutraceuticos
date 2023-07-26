import { Header } from "src/components/template"
import { Badge, Button, Confirm, Divider, Flex, Grid, IconButton, Input, Paper, Private, Select, SideFilters, Table, TableActions } from "src/components/ui"
import { useMotoboys } from "./hooks/useMotoboys"
import { ModalMotoboy } from "./components"

export const Motoboys = () => {

  const {
    tableData,
    closeModal,
    useModal,
    openModal,
    closeConfirm,
    openConfirm,
    useConfirm
  } = useMotoboys()

  return (
    <Private roles={['admin']} logout>

      <Header title="Motoboys" subtitle="Logística" />

      <Divider my={10} />

      <Paper>
        <Button color="green_600" onClick={openModal()}>
          Cadastrar motoboy
        </Button>
      </Paper>

      <Divider my={10} />

      <Paper>
        <Table
          columns={[
            { label: 'Nome', value: 'name' },
            { label: 'Telefone', value: 'phone' },
            {
              label: 'Status', value: 'status', render: value => (
                <Badge color={value ? 'green_600' : 'gray_500'}>{value ? 'Ativo' : 'desativado'}</Badge>
              )
            },
            {
              label: 'Ações', value: 'id', align: 'center', render: value => (
                <TableActions
                  actions={[
                    { type: 'Edit', onClick: openModal(value.toString()) },
                    { type: 'Delete', onClick: openConfirm(value.toString()) },
                  ]}
                />
              )
            },
          ]}
          data={tableData}
        />
      </Paper>

      <ModalMotoboy show={useModal.show} data={useModal.data} onClose={closeModal} />

      <Confirm
        {...useConfirm}
        onClose={closeConfirm}
        onConfirm={closeConfirm}
      />
    </Private>
  )
}

export default Motoboys