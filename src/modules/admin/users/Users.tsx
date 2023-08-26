import { Badge, Button, Confirm, Divider, Flex, Paper, Private, Table, TableActions } from "src/components/ui"
import ModalUser from "./ModalUser"
import { useUsers } from "./hooks/useUsers"
import { formatUTCDate } from "src/utils/date.utils"
import { Header } from "src/components/template"

const Users = () => {

  const {
    closeConfirm,
    closeModal,
    openConfirm,
    openModal,
    useConfirm,
    useModal,
    tableData
  } = useUsers()

  return (
    <Private roles={['admin']} logout>
      <Header title="Usuários" />
      <Divider my={10} />
      
      <Paper>
        <Flex items="end" justify="space-between">
          <Button size="sm" color="green_600" onClick={() => openModal()}>Cadastrar</Button>
        </Flex>
      </Paper>

      <Divider my={10} />
    
      <Paper>
        <Table
          columns={[
            { label: 'Nome', value: 'name' },
            { label: 'Tipo', value: 'role' },
            { label: 'Login', value: 'username' },
            {
              label: 'Data inicial',
              value: 'initial_date',
              render: value =>  value ? (
                <>{formatUTCDate(value.toString() || '')}</>
              ) : <></>              
            },
            { label: 'Status', value: 'status', render: value => (
              <Badge color={value == 1 ? 'green_600' : 'gray_500'}>{value == 1 ? 'Ativo' : 'desativado'}</Badge>
            ) },
            {
              label: 'Ações',
              value: 'id',
              align: 'center',
              render: (value, user) => (
                <TableActions
                  actions={[
                    { type: 'Edit', onClick: () => openModal(value.toString()) },
                    { type: 'Delete', onClick: () => openConfirm(value.toString(), user?.name.toString()) },
                  ]}
                />
              ),
            },
          ]}
          data={tableData}
        />
      </Paper>

      <ModalUser {...useModal} onClose={closeModal} />
      <Confirm {...useConfirm} onClose={closeConfirm} onConfirm={closeConfirm} />
    </Private>
  )
}

export default Users