import {
  Button,
  Divider,
  Flex,
  IconButton,
  Paper,
  Private,
  Text,
  Table,
  Confirm,
  Badge
} from "src/components/ui"

import ModalProduct from "./ModalProduct"

import { MdOutlineModeEditOutline } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'

import { useProducts } from "./hooks/useProducts"
import { floatToReal, formatReal } from "src/utils/number.utils"
import { Header } from "src/components/template"

const Products = () => {

  const {
    useModal,
    openModal,
    closeModal,
    closeConfirm,
    openConfirm,
    useConfirm,
    products
  } = useProducts()

  return (
    <Private>
      <Header title="Produtos" />
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
            { label: 'Valor', value: 'amount', render: value => (
              <Flex justify="end">
                <Text>{floatToReal(typeof value == 'number' ? value : parseFloat(value))}</Text>
              </Flex>
            ) },
            { label: 'Descrição', value: 'description' },
            { label: 'Anotações', value: 'notes' },
            { label: 'Status', value: 'active', render: value => (
              <Badge color={value == 1 ? 'green_600' : 'gray_500'}>{value == 1 ? 'Ativo' : 'desativado'}</Badge>
            ) },
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
          data={products?.map(p => ({ ...p, active: +p.active }))}
        />
      </Paper>

      <ModalProduct {...useModal} onClose={closeModal} />

      <Confirm
        {...useConfirm}
        onClose={closeConfirm}
        onConfirm={closeConfirm}
      />
    </Private>
  )
}

export default Products