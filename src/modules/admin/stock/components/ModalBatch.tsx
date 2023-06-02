import { FC } from 'react'

import { Button, Divider, Flex, Grid, IconButton, Input, Modal, Select, Text } from "src/components/ui"
import { AiOutlinePlus } from "react-icons/ai"
import { StyledTable } from "../styles"
import LoteItem from "./LoteItem"
import { useModalBatch } from '../hooks/useModalBatch'

export interface ModalBatchProps {
  show: boolean
  onClose: () => void
}

const ModalBatch: FC<ModalBatchProps> = ({
  show,
  onClose
}) => {

  const { products } = useModalBatch()

  return (
    <Modal show={show} onClose={onClose} maxWidth={600}>
      <Text size="xl" weight="600">Novo lote</Text>

      <Divider my={10} />

      <Flex gap={10} items="end">
        <Select
          block
          label="Produto"
          options={products.map(p => ({ label: p.name, value: p.id }))}
        />
        
        <IconButton color="sky_600">
          <AiOutlinePlus size={20} color="white" />
        </IconButton>
      </Flex>

      <Divider my={10} />

      <StyledTable>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Custo por Und.</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <LoteItem />
          <LoteItem />
          <LoteItem />
          <LoteItem />
        </tbody>
      </StyledTable>

      <Divider my={10} />

      <Text weight="500">Dados adicionais</Text>
      <Divider />

      <Grid template="1fr 1fr 1fr 1fr" items="end">
        <Input label="Valor frete" block />
        <div />
        <div />
        <div />
      </Grid>

      <Divider my={10} />
      
      <Flex items="end" justify="end" gap={10}>
        <Button size="sm" color="gray_500" onClick={onClose}>Cancelar</Button>
        <Button size="sm" color="green_600">Salvar</Button>
      </Flex>
    </Modal>
  )
}

export default ModalBatch