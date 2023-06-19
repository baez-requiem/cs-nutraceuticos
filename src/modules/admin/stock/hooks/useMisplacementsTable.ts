import { useState } from 'react'
import { useQuery } from 'react-query'
import { misplacementsApi } from 'src/services/api'

const useMisplacementsTable = () => {
  const { data: misplacements } = useQuery(
    'misplacements',
    async () => await misplacementsApi.getAllMisplacements(),
    { initialData: [] }
  )

  const misplacementsTableData = misplacements.map((batch, idx) => ({
    idx: idx+1,
    id: batch.id,
    notes: batch.notes,
    created_at: batch.created_at,
    products: batch.products.map(bp => `${bp.name}__${bp.quantity}`).join('--'),
  })).reverse()

  return {
    misplacementsTableData,
  }
}

export { useMisplacementsTable }