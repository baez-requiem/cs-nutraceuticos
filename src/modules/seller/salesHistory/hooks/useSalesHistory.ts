import { useState, useEffect } from 'react'
import { useFormik } from "formik"
import { formatDateTime, getEndMonthValue, getStartMonthValue } from "src/utils/date.utils"
import { useQuery, useQueryClient } from 'react-query'
import { logisticApi } from 'src/services/api'
import { toast } from 'react-toastify'
import { removeNullAndEmptyFields } from 'src/utils/objetct'
import { getStorageAuth } from 'src/utils/localstorage'
import { formatPhone } from 'src/utils/number.utils'
import { Sale } from 'src/services/api/logistic/logistic.types'

interface FiltersState {
  init_date?: string
  end_date?: string
}

interface ModalState {
  show: 'sale' | 'sale-history' | null
  data?: Sale
}

const useSalesHistory = () => {
  const [useModal, setModal] = useState<ModalState>({ show: null })
  const [useFilters, setFilters] = useState<FiltersState>({
    init_date: getStartMonthValue(new Date()),
    end_date: getEndMonthValue(new Date())
  })

  const storageAuth = getStorageAuth()

  const { data: sales, refetch: refetchSales } = useQuery(
    ['logistic/sales', {...useFilters, seller: storageAuth.refreshToken.userId }],
    async () => {
      const toastId = toast.loading('Carregando dados...')

      const data = await logisticApi.getSales({...useFilters, seller: storageAuth.refreshToken.userId })

      toast.dismiss(toastId)

      return data
    },
    { initialData: [], refetchOnWindowFocus: false }
  )

  useEffect(() => {
    refetchSales()
  }, [useFilters])

  const formik = useFormik({
    initialValues: {
      init_date: '',
      end_date: ''
    },
    onSubmit: (values) => setFilters(removeNullAndEmptyFields(values))
  })

  const openModal = (modal: ModalState['show'], id: string) => () => {
    const sale = sales.find(sale => sale.id === id)

    setModal({ show: modal, data: sale })
  }

  const closeModal = () => {
    (useModal.show === 'sale') && refetchSales()

    setModal({ show: null })
  }

  const tableData = sales.map(sale => ({
    id: sale.id,
    client_name: sale.name,
    client_phone: sale.phone ? formatPhone(sale.phone) : '',
    media: sale.media.name,
    sales_quantity: sale.sales_quantity,
    date: formatDateTime(sale.created_at),
    hasEditSale: +(sale.logistic_infos[0]?.id_sale_status === 'aguardando-aprovacao')
  }))

  return {
    formik,
    tableData,
    useModal,
    openModal,
    closeModal
  }
}

export { useSalesHistory }