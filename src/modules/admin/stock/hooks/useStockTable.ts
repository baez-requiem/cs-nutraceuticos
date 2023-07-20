import { useQuery } from 'react-query'
import { stockApi } from 'src/services/api'

const useStockTable = () => {
  const { data: stockProducts } = useQuery(
    'stock-products',
    async () => await stockApi.getStockProducts(),
    { initialData: [], refetchInterval: 5000 }
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