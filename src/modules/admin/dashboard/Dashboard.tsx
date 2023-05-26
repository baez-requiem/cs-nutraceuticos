import { Divider, Private, Text } from "src/components/ui"
import { MonthsInvoicingChart, DailyStatistics, MonthStatistics, LastSales, DailySalesBySeller, MonthSalesBySeller, DailySalesByMedia, MonthSalesByMedia, DailySalesByTeam } from "./components"
import { CardsContainer } from "./styles"
import MonthSalesByTeam from "./components/MonthSalesByTeam"

const Dashboard = () => {

  return (
    <Private>
      <Text size="xl2" weight="600" color="gray_900">Dashboard</Text>
      <Divider my={10} />
      <CardsContainer>
        <DailyStatistics />
        <MonthStatistics />
        <LastSales />
        <MonthsInvoicingChart />
        <DailySalesBySeller />
        <MonthSalesBySeller />
        <DailySalesByMedia />
        <MonthSalesByMedia />
        <DailySalesByTeam />
        <MonthSalesByTeam />
      </CardsContainer>
    </Private>
  )
}

export default Dashboard