import { Button, Divider, Flex, Paper, Private, Text } from "src/components/ui"
import { DaySalesChart, ModalNewSale } from "./components"
import { useDashboard } from "./hooks/useDashboard"
import { CardsContainer } from "./styles"
import SalesSummary from "./components/SalesSummary"

const Dashboard = () => {

  const { showModal, setShowModal } = useDashboard()

  return (
    <Private>
      <Text size="xl2" weight="600" color="gray_900">Dashboard</Text>
      <Divider my={10} />
      <CardsContainer>
        <Paper>
          <Flex gap={10} items="end" justify="end">
            <Button color="green_600" onClick={() => setShowModal(true)}>Nova venda</Button>
          </Flex>
        </Paper>

        <DaySalesChart />

        <SalesSummary />
      </CardsContainer>

      <ModalNewSale show={showModal} onClose={() => setShowModal(false)} />
    </Private>
  )
}

export default Dashboard