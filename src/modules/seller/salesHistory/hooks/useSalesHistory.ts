import { useState, useEffect } from 'react'
import { useFormik } from "formik"
import { formatDateTime, getEndMonthValue, getStartMonthValue } from "src/utils/date.utils"
import { useQuery } from 'react-query'
import { logisticApi } from 'src/services/api'
import { toast } from 'react-toastify'
import { removeNullAndEmptyFields } from 'src/utils/objetct'
import { getStorageAuth } from 'src/utils/localstorage'
import { formatPhone } from 'src/utils/number.utils'

interface FiltersState {
  init_date?: string
  end_date?: string
}

const useSalesHistory = () => {
  const storageAuth = getStorageAuth()
  
  const [useFilters, setFilters] = useState<FiltersState>({
    init_date: getStartMonthValue(new Date()),
    end_date: getEndMonthValue(new Date())
  })

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

  const tableData = sales.map(sale => ({
    id: sale.id,
    client_name: sale.name,
    client_phone: sale.phone ? formatPhone(sale.phone) : '',
    media: sale.media.name,
    sales_quantity: sale.sale_products.reduce((pv, cv) => pv + cv.sales_quantity, 0),
    date: formatDateTime(sale.created_at)
  }))

  return {
    formik,
    tableData
  }
}

export { useSalesHistory }