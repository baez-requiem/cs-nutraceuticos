import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { logisticApi, productsApi, usersApi } from "src/services/api"
import { formatDateTime, getEndMonthValue, getStartMonthValue } from "src/utils/date.utils"
import { floatToReal } from "src/utils/number.utils"
import { initialDataSalesFilters } from "../constants"
import { toast } from "react-toastify"
import { removeNullAndEmptyFields } from "src/utils/objetct"
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
  
  const { data: saleStatus } = useQuery(
    ['logistic/sale-status'],
    async () => logisticApi.getSaleStatus(),
    { initialData: [], refetchOnWindowFocus: false }
  )

  const { data: users } = useQuery(
    ['users', { user_role: 'seller' }],
    async () => usersApi.getAllUsers({ user_role: 'seller' }),
    { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
  )

  const { data: products } = useQuery(
    'products',
    productsApi.getAllProducts,
    { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
  )

  const tableData = sales.map(sale => {

    const { id, user, sale_products, discounts, logistic_infos, created_at, number, sales_quantity } = sale

    return ({
      id,
      number,
      user_name: user.name,
      total_sales: sales_quantity,
      total_products: sale_products.reduce((pv, cv) => pv + cv.quantity, 0),
      total_amount: floatToReal(sale_products.reduce((pv, cv) => pv + (cv.product.amount * cv.quantity), 0) - discounts),
      status: logistic_infos[0]?.sale_status.status,
      color_status: logistic_infos[0]?.sale_status.color,
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
    
    setModal({
      show: null
    })
  }

  const formik = useFormik({
    initialValues: initialDataSalesFilters,
    onSubmit: values => {
      setFilters(removeNullAndEmptyFields({...values, products: [values.products]}))
    },
  })

  useEffect(() => {
    refetchSales()
  }, [useFilters])

  const statusOpts = [
    { value: '', label: 'Todos' },
    ...saleStatus.map(status => ({ label: status.status, value: status.id }))
  ]

  const usersOpts = [
    { value: '', label: 'Todos' },
    ...users.map(user => ({ label: user.name, value: user.id }))
  ]

  const productsOpts = [
    { value: '', label: 'Todos' },
    ...products.map(product => ({ label: product.name, value: product.id }))
  ]

  const salePDF = (id: string) => () => {
    const sale = sales.find(sale => sale.id === id)

    makeSalePDF(sale)
  }

  return {
    tableData,
    statusOpts,
    usersOpts,
    useModal,
    openModalSale,
    openModalHistory,
    openModalLogisticInfos,
    closeModal,
    formik,
    salePDF,
    sales,
    productsOpts
  }
}

export { useSales }