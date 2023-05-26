import { FC } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { Divider, Grid, Modal, Text, Input, Textarea, Flex, Button, Select, IconButton, Paper } from "src/components/ui"
import Badge from "src/components/ui/badge/Badge"
import SellerCard from "./SellerCard"

export interface ModalSalesTeamProps {
  show: boolean
  data?: any
  onClose: () => void
}

const ModalSalesTeam: FC<ModalSalesTeamProps> = ({
  show,
  data,
  onClose
}) => {

  const titleText = !data?.id ? 'Nova equipe de venda' : `Editar equipe de venda - ${data?.name || 'teste'}`

  return (
    <Modal show={show} onClose={onClose} maxWidth={600}>
      <Text size="xl" weight="600">{titleText}</Text>

      <Divider my={10} />

      <Grid gap={10}>
        <Input label="Nome da equipe:" />
        <Textarea label="Anotações:" rows={6} />
      </Grid>

      <Divider my={10} />

      <Text weight="500">Vendedores</Text>
      <Divider />
      <Flex gap={10} items="end">
        <Select label="Adicionar vendedor" options={[{ label: '', value: '' },{ label: 'Fulano', value: 1 }]} block />
        <IconButton color="blue_600" size={32}>
          <AiOutlinePlus color="white" size={22} />
        </IconButton>
      </Flex>

      <Divider />

      <Grid gap={10} template="1fr 1fr 1fr">
        <SellerCard name="Fulano" />
        <SellerCard name="Fulano" />
        <SellerCard name="Fulano" />
        <SellerCard name="Fulano" />
        <SellerCard name="Fulano" />
      </Grid>

      
      <Divider line opacityLine={.15} my={10} />
      
      <Flex items="end" justify="end" gap={10}>
        <Button size="sm" color="gray_500" onClick={onClose}>Cancelar</Button>
        <Button size="sm" color="green_600">Salvar</Button>
      </Flex>
    </Modal>
  )
}

export default ModalSalesTeam