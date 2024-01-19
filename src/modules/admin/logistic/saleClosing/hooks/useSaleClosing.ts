import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { toast } from "react-toastify"
import { logisticApi, salesApi, usersApi } from "src/services/api"
import { formatDate, formatDateTime, getEndMonthValue, getStartMonthValue } from "src/utils/date.utils"
import { floatToReal, formatPhone } from "src/utils/number.utils"
import { removeNullAndEmptyFields } from "src/utils/objetct"
import { Sale } from "src/services/api/logistic/logistic.types"
import { makeSelectOpts } from "src/utils/form.utils"

interface ModalState {
  show: 'sale' | 'logistic-infos' | 'history' | null
  data?: Sale
}

interface FiltersState {
  init_date?: string
  end_date?: string
  seller?: string
  delivery_type?: string
  motoboy?: string
  payment_type?: string
}

const useSaleClosing = () => {
  const [useModal, setModal] = useState<ModalState>({ show: null })
  const [useFilters, setFilters] = useState<FiltersState>({
    init_date: getStartMonthValue(new Date()),
    end_date: getEndMonthValue(new Date())
  })

  const { data: querySales, refetch: refetchSales } = useQuery(
    'logistic/sales2e',
    async () => {
      const toastId = toast.loading('Carregando dados...')

      const data = await logisticApi.getSales(useFilters)

      toast.dismiss(toastId)

      return data
    },
    { initialData: [], refetchOnWindowFocus: false }
  )

  const sales = querySales.filter(sale => ['venda-agendada', 'enviada', 'entregue'].includes(sale.logistic_infos[0].id_sale_status))

  const { deliveryTypes, motoboys, users, paymentTypes } = useQueryData()

  useEffect(() => {
    refetchSales()
  }, [useFilters])

  const formik = useFormik({
    initialValues: {
      init_date: getStartMonthValue(new Date()),
      end_date: getEndMonthValue(new Date()),
      delivery_type: '',
      motoboy: '',
      seller: '',
      payment_type: ''
    },
    onSubmit: (values) => setFilters(removeNullAndEmptyFields(values))
  })

  const tableData = sales.map(sale => {

    const logisticInfos = sale.logistic_infos[0]

    return {
      id: sale.id,
      number: sale.number,
      created_at: formatDateTime(new Date(sale.created_at).toUTCString()),

      client_name: sale.name,
      client_city: sale.city,
      client_state: sale.state,
      client_phone: sale.phone ? formatPhone(sale.phone) : '',

      status: logisticInfos?.sale_status.status,
      color_status: logisticInfos?.sale_status.color,

      delivery_date: formatDate(logisticInfos.delivery_date),
      delivery_type: logisticInfos.delivery_type?.name,
      delivery_value: floatToReal(logisticInfos.delivery_value),
      motoboy: logisticInfos?.motoboy?.name || '',

      total_amount: floatToReal(sale.sale_products.reduce((pv, cv) => pv + (cv.product.amount * cv.quantity), 0) - sale.discounts),

      seller_name: sale.user.name,
    }
  })

  const usersOpts = makeSelectOpts(users, 'name', 'id', 'Todos')
  const deliveryTypesOpts = makeSelectOpts(deliveryTypes, 'name', 'id', 'Todos')
  const motoboysOpts = makeSelectOpts(motoboys, 'name', 'id', 'Todos')
  const paymentTypesOpts = makeSelectOpts(paymentTypes, 'name', 'id', 'Todos')

  const openModal = (modal: ModalState['show'], id: string) => () => setModal({
    show: modal,
    data: sales.find(sale => sale.id === id)
  })

  const closeModal = (by?: string) => {
    by === 'sale' && refetchSales()
    
    setModal({
      show: null
    })
  }

  return {
    tableData,
    motoboysOpts,
    deliveryTypesOpts,
    usersOpts,
    paymentTypesOpts,
    formik,
    useModal,
    openModal,
    closeModal,
    sales
  }
}

const useQueryData = () => {
  const { data: deliveryTypes } = useQuery(
    '/logistic/delivery-types',
    logisticApi.getDeliveryTypes,
    { refetchOnWindowFocus: false, initialData: [] }
  )

  const { data: motoboys } = useQuery(
    'logistic/motoboys',
    async () => logisticApi.getMotoboys(),
    { initialData: [], refetchOnWindowFocus: false }
  )

  const { data: users } = useQuery(
    ['users', { user_role: 'seller' }],
    async () => await usersApi.getAllUsers({ user_role: 'seller' }),
    { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
  )

  const { data: paymentTypes } = useQuery(
    'sales/payment-types',
    salesApi.getPaymentTypes,
    { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
)

  return {
    deliveryTypes,
    motoboys,
    users,
    paymentTypes
  }
}

export { useSaleClosing }