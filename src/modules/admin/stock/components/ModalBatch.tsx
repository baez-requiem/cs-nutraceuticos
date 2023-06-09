import { FC } from 'react'

import { Button, Divider, Flex, Grid, IconButton, Input, Modal, Select, Text } from "src/components/ui"
import { AiOutlinePlus } from "react-icons/ai"
import { StyledTable } from "../styles"
import LoteItem from "./LoteItem"
import { useModalBatch } from '../hooks/useModalBatch'
import { BatchType } from 'src/services/api/stock/stock.types'

export interface ModalBatchProps {
  show: boolean
  onClose: (arg0?: boolean) => void
  data?: BatchType
}

const ModalBatch: FC<ModalBatchProps> = ({
  show,
  onClose,
  data
}) => {

  const {
    addProduct,
    selectValue,
    handleSelect,
    removeProduct,
    newBatchProducts,
    selectOpts,
    onFormSubmit,
    shipping,
    onShippingChange,
    notes,
    setNotes
  } = useModalBatch(show, onClose, data)

  return (
    <Modal show={show} onClose={onClose} maxWidth={600}>
      <Text size="xl" weight="600">Novo lote</Text>

      <Divider my={10} />

      <Flex gap={10} items="end">
        <Select
          block
          label="Produto"
          options={selectOpts}
          onChange={handleSelect}
          value={selectValue}
          labelFixed={!!selectValue}
        />
        
        <IconButton color="sky_600" onClick={addProduct} disabled={!selectOpts.length}>
          <AiOutlinePlus size={20} color="white" />
        </IconButton>
      </Flex>

      <Divider my={10} />

      <form onSubmit={onFormSubmit}>
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
            {newBatchProducts.map(p => (
              <LoteItem
                id={p.id}
                key={p.id}
                name={p.name}
                quantity={p.quantity}
                unit_amount={p.unit_amount}
                onRemove={() => removeProduct(p.id)}
              />
            ))}
          </tbody>
        </StyledTable>
        
        <Divider my={10} />

        <Text weight="500">Dados adicionais</Text>
        <Divider />

        <Grid template="1fr 3fr" items="end" gap={10}>
          <Input
            block
            name='shipping'
            label="Valor frete"
            value={shipping}
            onChange={onShippingChange}
          />

          <Input
            block
            name='notes'
            label="Anotações"
            value={notes}
            onChange={({ target: { value } }) => setNotes(value)}
            labelFixed={!!notes}
          />
        </Grid>
        
        <Divider my={10} />
        
        <Flex items="end" justify="end" gap={10}>
          <Button size="sm" color="gray_500" onClick={() => onClose()} type='button'>Cancelar</Button>
          <Button size="sm" color="green_600" type='submit'>{data?.id ? 'Salvar': 'Cadastrar'}</Button>
        </Flex>
      </form>

    </Modal>
  )
}

export default ModalBatch