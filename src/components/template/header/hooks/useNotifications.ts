import { useState } from 'react'
import { useQuery } from "react-query"
import { stockApi } from "src/services/api"

const useNotifications = () => {
  const [show, setShow] = useState(false)

  const { data: stockProducts } = useQuery(
    ['stock-products', { active: true }],
    async () => await stockApi.getStockProducts({ active: true }),
    { initialData: [], refetchInterval: 10000 }
  )

  const hasLowStockProduct = stockProducts
    .filter(({ supply_quantity_notice, total }) => supply_quantity_notice > total)
    .length

  const hasNotifications = !!hasLowStockProduct

  const open = () => setShow(true)
  const close = () => setShow(false)
  const toggle = () => setShow(state => !state)

  return {
    hasLowStockProduct,
    hasNotifications,
    show,
    open,
    close,
    toggle
  }
}

export { useNotifications }