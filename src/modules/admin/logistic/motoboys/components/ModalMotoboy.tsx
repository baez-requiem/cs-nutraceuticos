import { FC } from "react"
import { Button, Divider, Flex, Grid, Input, Modal, Switch, Text, Textarea } from "src/components/ui"
import { useModalMotoboy } from "../hooks/useModalMotoboy"
import { handleChangeFormatPhone } from "src/utils/form.utils"

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

  const {
    formik: {
      values,
      handleChange,
      setFieldValue,
      submitForm
    }
  } = useModalMotoboy(show, onClose, data)

  return (
    <Modal show={show} onClose={onClose} maxWidth={700}>
      <Text size="xl" weight="600">{data?.id ? 'Editar' : 'Cadastrar'} Motoboy</Text>

      <Divider my={10} />

      <Grid template="1fr 1fr" gap={20} xs="1fr">
        <Input
          label="Nome"
          name="name"
          labelFixed={!!values.name}
          onChange={handleChange}
          value={values.name}
        />

        <Input
          label="Telefone"
          name="phone"
          onChange={handleChangeFormatPhone(setFieldValue)}
          labelFixed={!!values.phone}
          value={values.phone}
        />

      </Grid>

      <Divider />

      <Text size="sm">Status</Text>
      <Divider />
      <Switch
        label={values.active ? 'Ativo' : 'Desativado'}
        name="active"
        checked={values.active}
        onChange={handleChange}
      />

      <Divider />

      <Textarea
        rows={5}
        label="Anotações"
        name="notes"
        labelFixed={!!values.notes}
        onChange={handleChange}
        value={values.notes}
      />

      <Divider my={10} line opacityLine={.15} />

      <Flex items="end" justify="end" gap={10}>
        <Button size="sm" color="gray_500" type="button" onClick={onClose}>Cancelar</Button>
        <Button size="sm" color="green_600" onClick={submitForm}>Salvar</Button>
      </Flex>
    </Modal>
  )
}

export default ModalMotoboy