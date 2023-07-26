import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { misplacementsApi } from 'src/services/api'

const useMisplacementsTable = () => {

  const queryClient = useQueryClient()

  const { data: misplacements } = useQuery(
    'misplacements',
    misplacementsApi.getAllMisplacements,
    { initialData: [] }
  )

  const deleteMisplacementMutation = useMutation(async (id: string) => {
    const toastId = toast.loading("Excluindo extravio...")

    const hasDeleted = await misplacementsApi.deleteMisplacement(id)

    toast.dismiss(toastId)

    hasDeleted
      ? toast.success(`Extravio excluído com sucesso!`)
      : toast.error(`Houve um erro ao excluir o extravio.`)
  }, {
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: 'misplacements' })
      queryClient.refetchQueries({ queryKey: 'stock-products' })
    }
  })

  const misplacementsTableData = misplacements.map((batch, idx) => ({
    idx: idx+1,
    id: batch.id,
    notes: batch.notes,
    created_at: batch.created_at,
    products: batch.products.map(bp => `${bp.name}__${bp.quantity}`).join('--'),
  })).reverse()

  const deleteMisplacement = (id: string) => async () => await deleteMisplacementMutation.mutateAsync(id)

  return {
    misplacementsTableData,
    deleteMisplacement
  }
}

export { useMisplacementsTable }