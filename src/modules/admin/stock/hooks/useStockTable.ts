import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { stockApi } from 'src/services/api'

const useStockTable = () => {
  const { data: stockProducts } = useQuery(
    'stock-products',
    async () => {
      const toastId = toast.loading('Carregando estoque...')

      const response = await stockApi.getStockProducts()
      
      toast.dismiss(toastId)
      
      return response
    },
    { initialData: [], refetchInterval: 5000, refetchOnWindowFocus: false }
  )

  const tableData = stockProducts.map(({ active, supply_quantity_notice = 0, ...data }) => {
    let status: string = ''

    if (data.total < 0) {
      status = 'Negativo'
    } else if (data.total === 0) {
      status = 'Esgotado'
    } else if (supply_quantity_notice > data.total) {
      status = 'Abaixo do estoque mínimo'
    } else {
      status = 'Confortável'
    }

    return ({
      ...data,
      active: +active,
      status: status
    })
  })

  return {
    stockProducts,
    tableData
  }
}

export { useStockTable }