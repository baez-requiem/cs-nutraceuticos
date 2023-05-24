import {
  Button,
  Divider,
  Flex,
  IconButton,
  Paper,
  Private,
  SideFilters,
  Text,
  Table
} from "src/components/ui"

import { MdOutlineModeEditOutline } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'
import ModalProduct from "./ModalProduct"
import { useProducts } from "./hooks/useProducts"

const Products = () => {

  const { useModal, openModal, closeModal } = useProducts()

  return (
    <Private>
      <Text size="xl2" weight="600" color="gray_900">Produtos</Text>
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
            {
              label: 'Ações',
              value: 'id',
              align: 'center',
              render: () => (
                <Flex justify="center" gap={10}>
                  <IconButton color="blue_600" onClick={() => openModal({ id: 1 })}>
                    <MdOutlineModeEditOutline color="white" size={20} />
                  </IconButton>
                  <IconButton color="red_600">
                    <BsTrash color="white" size={18} />
                  </IconButton>
                </Flex>
              ),
            },
          ]}
          data={[
            { id: 1, name: 'Teste', description: 'descrição...', note: 'Anotação...' },
            { id: 2, name: 'Teste 2', description: 'descrição...', note: 'Anotação...' },
            { id: 3, name: 'Teste 3', description: 'descrição...', note: 'Anotação...' },
            { id: 4, name: 'Teste 4', description: 'descrição...', note: 'Anotação...' },
            { id: 5, name: 'Teste 5', description: 'descrição...', note: 'Anotação...' },
          ]}
        />
      </Paper>

      <ModalProduct {...useModal} onClose={closeModal} />
    </Private>
  )
}

export default Products