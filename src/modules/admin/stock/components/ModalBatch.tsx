import { Divider, Flex, Grid, IconButton, Input, Modal, Select, Text } from "src/components/ui"
import { AiOutlinePlus } from "react-icons/ai"
import { FaTimes } from "react-icons/fa"

const ModalBatch = () => {

  return (
    <Modal show onClose={() => {}} maxWidth={600}>
      <Text size="xl" weight="600">Novo lote</Text>

      <Divider my={10} />

      <Flex gap={10} items="end">
        <Select block label="Produto" options={[]} />
        <IconButton color="sky_600">
          <AiOutlinePlus size={20} color="white" />
        </IconButton>
      </Flex>

      <Divider my={10} />

      <Grid template="4fr 2fr 2fr 1fr" gap={20}>
        <Text>Produto</Text>
        <Text>Quantidade</Text>
        <Text>Custo por Und.</Text>
        <Text></Text>
      </Grid>

      <Divider />

      <Grid template="4fr 2fr 2fr 1fr" gap={20}>
        <Text>Viagra PLUS 12hrs</Text>
        <Input type="number" block placeholder="Ex: 100" />
        <Input block placeholder="Ex: 20,00" />
        <IconButton color="red_600">
          <FaTimes size={18} color="white" />
        </IconButton>
      </Grid>
    </Modal>
  )
}

export default ModalBatch