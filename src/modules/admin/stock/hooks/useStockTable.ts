import { useState } from 'react'
import { useQuery } from 'react-query'
import { stockApi } from 'src/services/api'

const useStockTable = () => {
  const { data: stockProducts } = useQuery(
    'stock-products',
    async () => await stockApi.getStockProducts(),
    { initialData: [] }
  )

  return {
    stockProducts,
  }
}

export { useStockTable }