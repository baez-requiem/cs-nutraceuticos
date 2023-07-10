import { Divider, Private, Text } from "src/components/ui"
import { MonthsInvoicingChart, DailyStatistics, MonthStatistics, LastSales, DailySalesBySeller, MonthSalesBySeller, DailySalesByMedia, MonthSalesByMedia, DailySalesByTeam } from "./components"
import { CardsContainer } from "./styles"
import MonthSalesByTeam from "./components/MonthSalesByTeam"
import { Header } from "src/components/template"
import { useDashboard } from "./hooks/useDashboard"

const Dashboard = () => {

  const {
    dailyStatistics,
    monthStatistics,
    lastSales
  } = useDashboard()

  return (
    <Private>
      <Header title="Dashboard" />
      <Divider my={10} />
      <CardsContainer>
        <DailyStatistics {...dailyStatistics} />
        <MonthStatistics {...monthStatistics} />
        <LastSales sales={lastSales} />
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