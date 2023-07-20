import { FC } from "react"
import { Button, Divider, Flex, Grid, Input, Modal, Switch, Text, Textarea } from "src/components/ui"

export interface ModalMotoboyProps {
  show: boolean
  onClose: () => void
  data?: MotoboyType
}

const ModalMotoboy: FC<ModalMotoboyProps> = ({
  onClose,
  show,
  data
}) => {

  return (
    <Modal show={show} onClose={onClose} maxWidth={700}>
      <Text size="xl" weight="600">{data?.id ? 'Editar' : 'Cadastrar'} Motoboy</Text>

      <Divider my={10} />

      <Grid template="2fr 1fr" gap={20} xs="1fr">
        <Input
          label="Nome"
        />

        <Input
          label="Telefone"
        />

      </Grid>

      <Divider />

      <Text size="sm">Status</Text>
      <Divider />
      <Switch
        label={true ? 'Ativo' : 'Desativado'}
        name="active"
      />

      <Divider />

      <Textarea
        rows={5}
        label="Anotações"
      />

      <Divider my={10} line opacityLine={.15} />

      <Flex items="end" justify="end" gap={10}>
        <Button size="sm" color="gray_500" type="button" onClick={onClose}>Cancelar</Button>
        <Button size="sm" color="green_600" type="submit">Salvar</Button>
      </Flex>
    </Modal>
  )
}

export default ModalMotoboy