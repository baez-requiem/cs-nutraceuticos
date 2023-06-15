import { useState } from 'react'
import { useQuery } from 'react-query'
import { stockApi } from 'src/services/api'

interface ModalState {
  data?: any
  opened: null | 'newBatch'
}

const useStock = () => {
  const [useModal, setModal] = useState<ModalState>({ opened: null })

  const { data: stockProducts } = useQuery('stock-products', async () => {
    return await stockApi.getStockProducts() 
  }, { initialData: [] })

  const openModal = (modal: ModalState['opened'], data?: any) => setModal({ opened: modal, data })

  const closeModal = () => setModal({ opened: null })

  return {
    openModal,
    closeModal,
    useModal,
    stockProducts
  }
}

export { useStock }