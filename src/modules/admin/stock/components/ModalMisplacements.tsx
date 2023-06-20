import { FC } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { Button, Divider, Flex, IconButton, Input, Modal, Select, Text } from "src/components/ui"
import { StyledMisplacementsTable } from "../styles"
import MisplacementProductItem from "./MisplacementProductItem"
import { useModalMisplacements } from "../hooks/useModalMisplacements"

export interface ModalMisplacementsProps {
  show: boolean
  onClose: () => void
}

const ModalMisplacements: FC<ModalMisplacementsProps> = ({ 
  onClose,
  show
 }) => {

  const { 
    addProduct,
    handleSelect,
    newMisplacementProducts,
    notes,
    removeProduct,
    selectOpts,
    selectValue,
    handleNotes,
    onFormSubmit
  } = useModalMisplacements(show, onClose)

  return (
    <Modal
      show={show}
      onClose={onClose}
      maxWidth={500}
    >
      <Text size="xl" weight="600">Registrar extravio</Text>

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
        
        <IconButton
          color="sky_600"
          onClick={addProduct}
          disabled={!selectOpts.length}
        >
          <AiOutlinePlus size={20} color="white" />
        </IconButton>
      </Flex>

      <Divider my={10} />

      <form onSubmit={onFormSubmit}>
        <StyledMisplacementsTable>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {newMisplacementProducts.map(p => (
              <MisplacementProductItem
                id={p.id}
                key={p.id}
                name={p.name}
                onRemove={() => removeProduct(p.id)}
              />
            ))}
          </tbody>
        </StyledMisplacementsTable>

        <Divider my={10} line opacityLine={.15} />

        <Input
          block
          name='notes'
          label="Anotações"
          value={notes}
          onChange={handleNotes}
          labelFixed={!!notes}
        />
        
        <Divider my={10} />
          
        <Flex items="end" justify="end" gap={10}>
          <Button size="sm" color="gray_500" onClick={onClose} type='button'>Cancelar</Button>
          <Button size="sm" color="green_600" type='submit'>Salvar</Button>
        </Flex>
      </form>
    </Modal>
  )
}

export default ModalMisplacements