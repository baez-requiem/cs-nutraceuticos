import { Button, Divider, Flex, Paper } from "src/components/ui"
import { DaySalesChart, SalesSummary } from "./components"
import { useDashboard } from "./hooks/useDashboard"
import { CardsContainer } from "./styles"
import { PrivatePage } from "src/components/context"
import { HeaderSeller } from "src/components/template"
import { SaleModal } from "src/components/modals"

const Dashboard = () => {

  const { showModal, setShowModal, data } = useDashboard()

  return (
    <PrivatePage roles={['seller']}>
      <HeaderSeller title="Dashboard" />

      <Divider my={10} />
      
      <CardsContainer>
        <Paper>
          <Flex gap={10} items="end" justify="end">
            <Button color="green_600" onClick={() => setShowModal(true)}>Nova venda</Button>
          </Flex>
        </Paper>

        <DaySalesChart data={data?.totalSalesPerDay} />

        <SalesSummary
          totalSalesMonth={data?.totalSalesMonth}
          totalSalesWeek={data?.totalSalesWeek}
          totalSalesDay={data?.totalSalesDay}
        />
      </CardsContainer>

      <SaleModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </PrivatePage>
  )
}

export default Dashboard