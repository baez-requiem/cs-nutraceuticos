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

const SalesTeam = () => {

  const {
    useModal,
    openModal,
    closeModal,
    closeConfirm,
    openConfirm,
    useConfirm
  } = useSalesTeam()

  return (
    <Private>
      <Text size="xl2" weight="600" color="gray_900">Equipes de venda</Text>
      <Divider my={10} />

      <Paper>
        <Flex items="end" justify="space-between">
          <Button size="sm" color="green_600" onClick={openModal}>Cadastrar</Button>

          <SideFilters>

          </SideFilters>
        </Flex>
      </Paper>

      <Divider my={10} />
      
      <Paper>
        <Table
          columns={[
            { label: 'ID', value: 'id' },
            { label: 'Equipe', value: 'team' },
            { label: 'Vendedores', value: 'sellers' },
            { label: 'Anotações', value: 'note' },
            {
              label: 'Ações',
              value: 'id',
              align: 'center',
              render: (value, data) => (
                <Flex justify="center" gap={10}>
                  <IconButton color="blue_600" onClick={() => openModal({ id: 1 })}>
                    <MdOutlineModeEditOutline color="white" size={20} />
                  </IconButton>
                  <IconButton color="red_600" onClick={() => openConfirm(value, data?.name || '')}>
                    <BsTrash color="white" size={18} />
                  </IconButton>
                </Flex>
              ),
            },
          ]}
          data={[
            { id: 1, team: 'Alfa', sellers: '#1-Fulano de tal, #1-Fulalinho, #1-Fulana', note: 'Anotação...' },
            { id: 2, team: 'Beta', sellers: '#2-Fulano de tal, #2-Fulalinho, #2-Fulana', note: 'Anotação...' },
            { id: 3, team: 'Omêga', sellers: '#3-Fulano de tal, #3-Fulalinho, #3-Fulana', note: 'Anotação...' },
          ]}
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