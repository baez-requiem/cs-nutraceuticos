import { useState } from "react"
import { useQuery } from "react-query"
import { dashboardApi } from "src/services/api"

const useDashboard = () => {

  const [showModal, setShowModal] = useState(false)

  const { data } = useQuery(
    '/dashboard/seller-resume',
    dashboardApi.getSellerDashboard
  )

  return {
    showModal,
    setShowModal,
    data
  }
}

export { useDashboard }