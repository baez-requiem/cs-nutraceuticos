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
  Confirm,
  Badge
} from "src/components/ui"

import { MdOutlineModeEditOutline } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'
import ModalMedia from "./ModalMedia"

import { useMedias } from "./hooks/useMedias"

const Products = () => {

  const {
    useModal,
    openModal,
    closeModal,
    closeConfirm,
    openConfirm,
    useConfirm
  } = useMedias()

  return (
    <Private>
      <Text size="xl2" weight="600" color="gray_900">Mídias</Text>
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
            { label: 'Nome', value: 'name' },
            { label: 'Descrição', value: 'description' },
            { label: 'Anotações', value: 'note' },
            { label: 'Status', value: 'active', render: value => (
              <Badge color={value == 1 ? 'green_600' : 'gray_500'}>{value == 1 ? 'Ativo' : 'desativado'}</Badge>
            ) },
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
            { id: 1, name: 'Teste', description: 'descrição...', note: 'Anotação...', active: 1 },
            { id: 2, name: 'Teste 2', description: 'descrição...', note: 'Anotação...', active: 1 },
            { id: 3, name: 'Teste 3', description: 'descrição...', note: 'Anotação...', active: 1 },
            { id: 4, name: 'Teste 4', description: 'descrição...', note: 'Anotação...', active: 1 },
            { id: 5, name: 'Teste 5', description: 'descrição...', note: 'Anotação...', active: 0 },
          ]}
        />
      </Paper>

      <ModalMedia {...useModal} onClose={closeModal} />

      <Confirm
        {...useConfirm}
        onClose={closeConfirm}
        onConfirm={closeConfirm}
      />
    </Private>
  )
}

export default Products