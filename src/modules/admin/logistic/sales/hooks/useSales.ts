import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { logisticApi } from "src/services/api"
import { formatDate, formatDateTime, getEndMonthValue, getStartMonthValue } from "src/utils/date.utils"
import { floatToReal } from "src/utils/number.utils"
import { toast } from "react-toastify"
import { hasShowPdfAction, makeSalePDF } from "../utils"
import { Sale } from "src/services/api/logistic/logistic.types"

interface ModalState {
  show: 'sale' | 'logistic-infos' | 'history' | null
  data?: Sale
}

interface FiltersState {
  init_date?: string
  end_date?: string
  status?: string
  seller?: string
  client_name?: string
  client_phone?: string
  number?: number
  products?: string[]
}

const useSales = () => {
  const [useModal, setModal] = useState<ModalState>({ show: null })
  const [useFilters, setFilters] = useState<FiltersState>({
    init_date: getStartMonthValue(new Date()),
    end_date: getEndMonthValue(new Date())
  })

  const { data: sales, refetch: refetchSales  } = useQuery(
    ['logistic/sales', useFilters],
    async () => {
      const toastId = toast.loading('Carregando dados...')

      const filters = { ...useFilters }

      const data = await logisticApi.getSales(filters)

      toast.dismiss(toastId)

      return data
    },
    { initialData: [], refetchOnWindowFocus: false }
  )

  const tableData = sales.map(sale => {

    const { id, user, sale_products, discounts, logistic_infos, created_at, number, sales_quantity } = sale

    const logistic_info = logistic_infos[0]!

    return ({
      id,
      number,
      user_name: user.name,
      total_sales: sales_quantity,
      total_products: sale_products.reduce((pv, cv) => pv + cv.quantity, 0),
      total_amount: floatToReal(sale_products.reduce((pv, cv) => pv + (cv.product.amount * cv.quantity), 0) - discounts),
      status: logistic_info.id_sale_status === 'venda-agendada' ? `Venda agendada para ${formatDate(logistic_info.delivery_date)}` : logistic_info.sale_status.status,
      color_status: logistic_info.sale_status.color,
      date: formatDateTime(new Date(created_at).toUTCString()),
      showPdf: +hasShowPdfAction(sale)
    })
  })

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

  const closeModal = (by?: string) => {
    by === 'sale' && refetchSales()
    
    setModal({ show: null })
  }

  const onFilter = (filters: FiltersState) => {
    setFilters(filters)
  }

  useEffect(() => {
    refetchSales()
  }, [useFilters])

  const salePDF = (id: string, convertToPNG?: boolean) => () => {
    const sale = sales.find(sale => sale.id === id)

    makeSalePDF(sale, convertToPNG)
  }

  return {
    tableData,
    useModal,
    openModalSale,
    openModalHistory,
    openModalLogisticInfos,
    closeModal,
    onFilter,
    salePDF,
    sales,
    useFilters
  }
}

export { useSales }