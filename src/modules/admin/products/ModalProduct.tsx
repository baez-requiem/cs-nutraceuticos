import { FC } from "react"
import { Divider, Grid, Modal, Text, Input, Textarea, Flex, Button } from "src/components/ui"

export interface ModalProductProps {
  show: boolean
  data?: any
  onClose: () => void
}

const ModalProduct: FC<ModalProductProps> = ({
  show,
  data,
  onClose
}) => {

  const titleText = !data?.id ? 'Adicionar produto' : `Editar produto - ${data?.name || 'teste'}`

  return (
    <Modal show={show} onClose={onClose} maxWidth={600}>
      <Text size="xl" weight="600">{titleText}</Text>

      <Divider my={10} />

      <Grid gap={10}>
        <Input label="Nome:" />
        <Input label="Descrição:" />
        <Textarea label="Anotações:" rows={6} />
      </Grid>

      <Divider my={10} />
      
      <Flex items="end" justify="end" gap={10}>
        <Button size="sm" color="gray_500" onClick={onClose}>Cancelar</Button>
        <Button size="sm" color="green_600">Salvar</Button>
      </Flex>
    </Modal>
  )
}

export default ModalProduct