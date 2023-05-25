import { FC } from "react"
import { Divider, Grid, Modal, Text, Input, Textarea, Flex, Button } from "src/components/ui"

export interface ModalSellerProps {
  show: boolean
  data?: any
  onClose: () => void
}

const ModalSeller: FC<ModalSellerProps> = ({
  show,
  data,
  onClose
}) => {

  const titleText = !data?.id ? 'Cadastrar vendedor' : `Editar vendedor - ${data?.name || 'Fulano de tal'}`

  return (
    <Modal show={show} onClose={onClose} maxWidth={600}>
      <Text size="xl" weight="600">{titleText}</Text>

      <Divider my={10} />

      <Grid gap={10} template="1fr 1fr">
        <Input label="Nome:" />
        <Input label="Telefone:" />
        <Input label="RG:" />
        <Input label="CPF:" />
        <Input type="date" label="Data inicial:" value="2021-01-10" readOnly />
        <Input label="Login:" />
        <Input type="password" label="Senha:" />
        <Input label="Status:" />
        <Input label="Equipe:" />
        
        {/* <Textarea label="Anotações:" rows={6} /> */}
      </Grid>

      <Divider my={10} />
      
      <Flex items="end" justify="end" gap={10}>
        <Button size="sm" color="gray_500" onClick={onClose}>Cancelar</Button>
        <Button size="sm" color="green_600">Salvar</Button>
      </Flex>
    </Modal>
  )
}

export default ModalSeller