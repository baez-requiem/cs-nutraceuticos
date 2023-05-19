import { Divider, Paper, Text } from "src/components/ui"
import { DailyInvoicing, MonthsInvoicingChart } from "./components"
import { CardsContainer } from "./styles"

const Dashboard = () => {

  return (
    <>
      <Text size="xl2" weight="600" color="rgb(8, 47, 73)">Dashboard</Text>
      <Divider my={10} />
      <CardsContainer>
        <DailyInvoicing />
        <MonthsInvoicingChart />
      </CardsContainer>
    </>
  )
}

export default Dashboard