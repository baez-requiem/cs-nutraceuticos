import { FC } from "react"
import { Button, Divider, Flex, Grid, IconButton, Input, Modal, Table, Text } from "src/components/ui"

export interface ModalStockProps {
  show: boolean
  onClose: () => void
}

const mockData = [
  { id: 1, product: 'VIAGRA CPS', quantity: '987' },
  { id: 2, product: 'VITA GOLD', quantity: '0' },
  { id: 3, product: 'BEAUTY CAPS', quantity: '80' },
]


const ModalStock: FC<ModalStockProps> = ({
  onClose,
  show
}) => {

  return (
    <Modal show={show} onClose={onClose} maxWidth={800}>
      <Text size="xl" weight="600">Ajustar estoque</Text>

      <Divider my={10} />

      <Grid template="3fr 1fr 1fr">
        <Text>#1 Produto</Text>
        <Input />
        <Flex>
          <IconButton color="sky_600">
          </IconButton>
        </Flex>
      </Grid>
    </Modal>
  )
}

export default ModalStock