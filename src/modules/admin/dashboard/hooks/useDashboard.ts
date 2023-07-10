import { useQuery } from "react-query"
import dashboard from "src/services/api/dashboard/dashboard"

const useDashboard = () => {

  const { data: dailyStatistics } = useQuery(
    'dashboard/daily-statistics',
    dashboard.getDailyStatistics,
    { refetchInterval: 10000 }
  )
  
  const { data: monthStatistics } = useQuery(
    'dashboard/month-statistics',
    dashboard.getMonthStatistics,
    { refetchInterval: 10000 }
  )

  const { data: lastSales } = useQuery(
    'dashboard/last-sales',
    dashboard.getLastSales,
    { refetchInterval: 10000 }
  )
  

  return {
    dailyStatistics,
    monthStatistics,
    lastSales
  }
}

export { useDashboard }