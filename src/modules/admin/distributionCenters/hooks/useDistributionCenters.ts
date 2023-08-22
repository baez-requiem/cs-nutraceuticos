import { useState } from 'react'
import { useQuery } from 'react-query'
import { distributionCentersApi } from 'src/services/api'
import { DistributionCenterStockType } from 'src/services/api/distributionCenters/distributionCenters.types'

interface ModalState {
  show: 'entry' | 'transfer' | 'supply' | 'leave' | null
  data?: DistributionCenterStockType
}

const useDistributionCenters = () => {
  const [useModal, setModal] = useState<ModalState>({ show: null })

  const { data: distributionCentersStock } = useQuery(
    'distribution-centers/stock',
    distributionCentersApi.getAllStock,
    { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
  )

  const openModal = (show: ModalState['show'], data?: ModalState['data']) => () => setModal({ show, data })
  const closeModal = () => () => setModal({ show: null })

  const modalProps = (show: ModalState['show']) => ({
    show: useModal.show === show,
    onClose: closeModal(),
    data: useModal.data
  })

  return {
    openModal,
    modalProps,
    distributionCentersStock
  }
}

export { useDistributionCenters }