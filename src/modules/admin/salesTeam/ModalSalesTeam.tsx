import { FC } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { Divider, Grid, Modal, Text, Input, Textarea, Flex, Button, Select, IconButton, Paper } from "src/components/ui"
import Badge from "src/components/ui/badge/Badge"
import SellerCard from "./SellerCard"
import { useModalSaleTeam } from "./hooks/useModalSaleTeam"

export interface ModalSalesTeamProps {
  show: boolean
  data?: any
  onClose: (arg0?: boolean) => void
}

const ModalSalesTeam: FC<ModalSalesTeamProps> = ({
  show,
  data,
  onClose
}) => {

  const {
    formik: {
      handleChange,
      values,
      submitForm
    }
  } = useModalSaleTeam(show, onClose, data)

  const titleText = !data?.id ? 'Nova equipe de venda' : `Editar equipe de venda - ${data?.name || 'teste'}`

  return (
    <Modal show={show} onClose={onClose} maxWidth={600}>
      <Text size="xl" weight="600">{titleText}</Text>

      <Divider my={10} />

      <Grid gap={10}>
        <Input
          label="Nome da equipe:"
          name="name"
          onChange={handleChange}
          value={values.name}
          labelFixed={!!values.name}
        />

        <Textarea
          rows={6}
          label="Anotações:"
          name="notes"
          onChange={handleChange}
          value={values.notes}
          labelFixed={!!values.notes}
        />
      </Grid>

      <Divider my={10} />
      
      <Flex items="end" justify="end" gap={10}>
        <Button size="sm" color="gray_500" onClick={() => onClose()}>Cancelar</Button>
        <Button size="sm" color="green_600" onClick={submitForm}>Salvar</Button>
      </Flex>
    </Modal>
  )
}

export default ModalSalesTeam