import {
  Button,
  Divider,
  Flex,
  IconButton,
  Paper,
  Private,
  SideFilters,
  Text,
  Table,
  Confirm
} from "src/components/ui"

import { MdOutlineModeEditOutline } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'
import ModalSalesTeam from "./ModalSalesTeam"

import { useSalesTeam } from "./hooks/useSalesTeam"
import { Header } from "src/components/template"

const SalesTeam = () => {

  const {
    useModal,
    openModal,
    closeModal,
    closeConfirm,
    openConfirm,
    useConfirm,
    salesTeam
  } = useSalesTeam()

  return (
    <Private roles={['admin']} logout>
      <Header title="Equipes de venda" />
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
            { label: 'Equipe', value: 'name' },
            { label: 'Anotações', value: 'notes' },
            {
              label: 'Ações',
              value: 'id',
              align: 'center',
              render: value => (
                <Flex justify="center" gap={10}>
                  <IconButton color="blue_600" onClick={() => openModal(value.toString())}>
                    <MdOutlineModeEditOutline color="white" size={20} />
                  </IconButton>
                  <IconButton color="red_600" onClick={() => openConfirm(value.toString())}>
                    <BsTrash color="white" size={18} />
                  </IconButton>
                </Flex>
              ),
            },
          ]}
          data={salesTeam}
        />
      </Paper>

      <ModalSalesTeam {...useModal} onClose={closeModal} />

      <Confirm
        {...useConfirm}
        onClose={closeConfirm}
        onConfirm={closeConfirm}
      />
    </Private>
  )
}

export default SalesTeam