import { Button, Divider, Flex, Paper, Private, Text } from "src/components/ui"
import { ModalNewSale } from "./components"
import { useDashboard } from "./hooks/useDashboard"

const Dashboard = () => {

  const { showModal, setShowModal } = useDashboard()

  return (
    <Private>
      <Text size="xl2" weight="600" color="gray_900">Dashboard</Text>
      <Divider my={10} />
      <Paper>
        <Flex gap={10} items="end" justify="end">
          <Button color="green_600" onClick={() => setShowModal(true)}>Nova venda</Button>
        </Flex>
      </Paper>

      <ModalNewSale show={showModal} onClose={() => setShowModal(false)} />
    </Private>
  )
}

export default Dashboard