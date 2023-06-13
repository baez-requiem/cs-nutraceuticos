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

import ModalMedia from "./ModalMedia"

import { MdOutlineModeEditOutline } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'

import { useMedias } from "./hooks/useMedias"

const Medias = () => {

  const {
    useModal,
    openModal,
    closeModal,
    closeConfirm,
    openConfirm,
    useConfirm,
    medias
  } = useMedias()

  return (
    <Private>
      <Text size="xl2" weight="600" color="gray_900">Mídias</Text>
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
          data={medias?.map(p => ({ ...p, active: +p.active }))}
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

export default Medias