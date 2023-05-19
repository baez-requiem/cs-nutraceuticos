import { Text } from "src/components/ui"
import { MonthsInvoicingChart } from "./components"

const Dashboard = () => {

  return (
    <>
      <Text size="xl2" weight="600" color="rgb(8, 47, 73)">Dashboard</Text>
      <MonthsInvoicingChart />
    </>
  )
}

export default Dashboard