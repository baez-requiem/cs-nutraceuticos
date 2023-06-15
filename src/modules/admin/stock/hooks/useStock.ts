import { useState } from 'react'
import { useQuery } from 'react-query'
import { stockApi } from 'src/services/api'

interface ModalState {
  data?: any
  opened: null | 'newBatch'
}

const useStock = () => {
  const [useModal, setModal] = useState<ModalState>({ opened: null })

  const { data: stockProducts, refetch } = useQuery('stock-products', async () => {
    return await stockApi.getStockProducts() 
  }, { initialData: [] })

  const openModal = (modal: ModalState['opened'], data?: any) => setModal({ opened: modal, data })

  const closeModal = (hasRefetch?: boolean) => {
    setModal({ opened: null })
    hasRefetch && refetch()
  }

  return {
    openModal,
    closeModal,
    useModal,
    stockProducts
  }
}

export { useStock }