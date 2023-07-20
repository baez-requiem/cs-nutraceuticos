import { useState } from "react"
import { useQuery } from "react-query"
import { logisticApi } from "src/services/api"
import { formatDateTime, formatUTCDateTime } from "src/utils/date.utils"
import { floatToReal } from "src/utils/number.utils"

interface ModalState {
  show: 'sale' | 'logistic-infos' | 'history' | null
  data?: Sale
}

const useSales = () => {
  const [useModal, setModal] = useState<ModalState>({ show: null })

  const { data: sales } = useQuery('logistic/sales', logisticApi.getSales, { initialData: [], refetchOnWindowFocus: false })

  const tableData = sales.map(({ id, user, sale_products, discounts, logistic_infos, created_at }) => ({
    id,
    user_name: user.name,
    total_sales: sale_products.reduce((pv, cv) => pv + cv.sales_quantity, 0),
    total_products: sale_products.reduce((pv, cv) => pv + cv.quantity, 0),
    total_amount: floatToReal(sale_products.reduce((pv, cv) => pv + (cv.product.amount * cv.quantity), 0) - discounts),
    status: logistic_infos[0]?.sale_status.status,
    color_status: logistic_infos[0]?.sale_status.color,
    date: formatDateTime(new Date(created_at).toUTCString())
  }))

  const openModalSale = (id: string) => () => setModal({
    show: 'sale',
    data: sales.find(sale => sale.id === id)
  })

  const openModalLogisticInfos = (id: string) => () => setModal({
    show: 'logistic-infos',
    data: sales.find(sale => sale.id === id)
  })

  const openModalHistory = (id: string) => () => setModal({
    show: 'history',
    data: sales.find(sale => sale.id === id)
  })

  const closeModal = () => setModal({
    show: null
  })

  return {
    tableData,
    useModal,
    openModalSale,
    openModalHistory,
    openModalLogisticInfos,
    closeModal
  }
}

export { useSales }