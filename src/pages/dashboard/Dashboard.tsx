import { Divider, Paper, Text } from "src/components/ui"
import { DailyInvoicing, MonthsInvoicingChart, DailyStatistics, MonthStatistics, LastSales } from "./components"
import { CardsContainer } from "./styles"

const Dashboard = () => {

  return (
    <>
      <Text size="xl2" weight="600" color="gray_900">Dashboard</Text>
      <Divider my={10} />
      <CardsContainer>
        <DailyStatistics />
        <MonthStatistics />
        <LastSales />
        <MonthsInvoicingChart />
      </CardsContainer>
    </>
  )
}

export default Dashboard