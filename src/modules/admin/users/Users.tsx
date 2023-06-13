import { BsTrash } from "react-icons/bs"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { Button, Confirm, Divider, Flex, IconButton, Paper, Private, Table, Text } from "src/components/ui"
import ModalUser from "./ModalUser"
import { useUsers } from "./hooks/useUsers"
import { formatUTCDate } from "src/utils/date.utils"

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
    <Private>
      <Text size="xl2" weight="600" color="gray_900">Usuários</Text>
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
            {
              label: 'Ações',
              value: 'id',
              align: 'center',
              render: value => (
                <Flex justify="center" gap={10}>
                  <IconButton color="blue_600" onClick={() => openModal(value.toString())}>
                    <MdOutlineModeEditOutline color="white" size={20} />
                  </IconButton>
                  <IconButton color="red_600" onClick={() => openConfirm(value, 'fulano de tal')}>
                    <BsTrash color="white" size={18} />
                  </IconButton>
                </Flex>
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