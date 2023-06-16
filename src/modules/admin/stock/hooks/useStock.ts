import { useState } from 'react'
import { useQuery } from 'react-query'
import { stockApi } from 'src/services/api'

interface ModalState {
  data?: any
  opened: null | 'newBatch'
}

const useStock = () => {
  const [useModal, setModal] = useState<ModalState>({ opened: null })

  const { data: stockProducts } = useQuery(
    'stock-products',
    async () => await stockApi.getStockProducts(),
    { initialData: [] }
  )
  
  const { data: batches } = useQuery(
    'batches',
    async () => await stockApi.getBatches(),
    { initialData: [] }
  )

  const openModal = (modal: ModalState['opened'], data?: any) => setModal({ opened: modal, data })

  const closeModal = () => setModal({ opened: null })

  const batchesTableData = batches.map((batch, idx) => ({
    idx: idx+1,
    id: batch.id,
    notes: batch.notes,
    shipping: batch.shipping,
    created_at: batch.created_at,
    products: batch.BatchesProducts.map(bp => `${bp.product.name}__${bp.quantity}__${bp.unit_amount}`).join('--'),
  })).reverse()

  return {
    openModal,
    closeModal,
    useModal,
    stockProducts,
    batchesTableData
  }
}

export { useStock }