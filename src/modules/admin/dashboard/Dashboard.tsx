import { Divider, Private, Text } from "src/components/ui"
import { MonthsInvoicingChart, DailyStatistics, MonthStatistics, LastSales, DailySalesBySeller, MonthSalesBySeller, DailySalesByMedia, MonthSalesByMedia, DailySalesByTeam } from "./components"
import { CardsContainer } from "./styles"
import MonthSalesByTeam from "./components/MonthSalesByTeam"
import { Header } from "src/components/template"

const Dashboard = () => {

  return (
    <Private>
      <Header title="Dashboard" />
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