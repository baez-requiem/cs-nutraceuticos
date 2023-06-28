import { FC } from "react"
import { Divider, Grid, Modal, Text, Input, Textarea, Flex, Button, Switch } from "src/components/ui"

import { ProductType } from "src/services/api/products/products.types"
import { useModalProduct } from "./hooks/useModalProduct"
import { handleChangeFormatReal } from "src/utils/form.utils"

export interface ModalProductProps {
  show: boolean
  data?: ProductType
  onClose: (arg0?: boolean) => void
}

const ModalProduct: FC<ModalProductProps> = ({
  show,
  data,
  onClose
}) => {

  const titleText = !data?.id ? 'Adicionar produto' : `Editar produto: ${data.name}`
  
  const { 
    formik: {
      handleChange,
      submitForm,
      values,
      setFieldValue
    }
  } = useModalProduct(show, onClose, data)

  return (
    <Modal show={show} onClose={onClose} maxWidth={600}>
      <Text size="xl" weight="600">{titleText}</Text>

      <Divider my={10} />

      <Grid gap={10} template="3fr 1fr" xs="1fr">
        <Input
          label="Nome:"
          name="name"
          labelFixed={!!values.name}
          value={values.name}
          onChange={handleChange}
        />
       
        <Input
          label="Valor:"
          name="amount"
          block
          labelFixed={!!values.amount}
          value={values.amount}
          onChange={handleChangeFormatReal(setFieldValue)}
        />
      </Grid>

      <Divider />

      <Grid gap={10} template="1fr 1fr" xs="1fr">
        <Input
          label="Descrição:"
          name="description"
          labelFixed={!!values.description}
          value={values.description}
          onChange={handleChange}
        />

        <Input
          label="Qntd. aviso de abastecimento:"
          name="supply_quantity_notice"
          block
          labelFixed={!!values.supply_quantity_notice}
          value={values.supply_quantity_notice}
          min={0}
          type="number"
          onChange={handleChange}
        />
      </Grid>

      <Divider />

      <Textarea
        rows={6}
        label="Anotações:"
        name="notes"
        labelFixed={!!values.notes}
        value={values.notes}
        onChange={handleChange}
      />

      <Divider my={10} />

      <Text weight="500">Status</Text>
      <Divider />
      <Switch
        label="Ativo"
        name="active"
        checked={values.active}
        onChange={handleChange}
      />

      <Divider my={10} />
      
      <Flex items="end" justify="end" gap={10}>
        <Button size="sm" color="gray_500" onClick={() => onClose()}>Cancelar</Button>
        <Button size="sm" color="green_600" onClick={submitForm}>Salvar</Button>
      </Flex>
    </Modal>
  )
}

export default ModalProduct