import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from "react-query"
import { toast } from 'react-toastify'
import { stockApi } from "src/services/api"
import { BatchType } from 'src/services/api/stock/stock.types'

interface useConfirmState {
  id?: string
  show?: boolean
  title?: string
  description?: string
}

const useBatchesTable = () => {
  const [useConfirm, setConfirm] = useState<useConfirmState>({ })
  const [useModal, setModal] = useState<BatchType|null>(null)

  const queryClient = useQueryClient()

  const { data: batches } = useQuery(
    'batches',
   async () => {
    const toastId = toast.loading('Carregando lotes...')

    const response = await stockApi.getBatches()

    toast.dismiss(toastId)

    return response
   },
    { initialData: [], refetchOnWindowFocus: false }
  )

  const batchMutation = useMutation(async (id: string) => {
    const toastId = toast.loading("Excluindo produto...")

    const hasDeleted = await stockApi.deleteBatch(id)

    toast.dismiss(toastId)

    if (!hasDeleted) {
      toast.error(`Houve um erro ao excluir o lote.`)
      return
    }

    toast.success(`Lote excluído com sucesso!`)
  })

  const batchesTableData = batches.map((batch, idx) => ({
    idx: idx+1,
    id: batch.id,
    notes: batch.notes,
    shipping: batch.shipping,
    created_at: batch.created_at,
    products: batch.products.map(bp => `${bp.name}__${bp.quantity}__${bp.unit_amount}`).join('--'),
  })).reverse()

  const openModal = (id: string) => {
    const batch = batches.find(p => p.id == id)

    setModal(batch)
  }

  const openConfirm = (id: string) => {
    const batch = batchesTableData.find(p => p.id == id)
    
    setConfirm({
      id,
      show: true,
      title: 'Atenção',
      description: `Você tem certeza que deseja excluir o lote: ${batch.idx}.`,
    })
  }

  const closeConfirm = async (isConfirmed?: boolean) => {
    if (isConfirmed && useConfirm.id) {
      await batchMutation.mutateAsync(useConfirm.id)

      queryClient.refetchQueries({ queryKey: ['batches'] })
      queryClient.refetchQueries({ queryKey: ['stock-products'] })
    }

    setConfirm({})
  }

  return {
    batchesTableData,
    openConfirm,
    closeConfirm,
    useConfirm,
    useModal,
    setModal,
    openModal
  }
}

export { useBatchesTable }