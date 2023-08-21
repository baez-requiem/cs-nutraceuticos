import { useState } from 'react'

interface ModalState {
  show: 'entry' | 'dc' | null
}

const useDistributionCenters = () => {
  const [useModal, setModal] = useState<ModalState>({ show: null })

  const openModal = (show: ModalState['show']) => () => setModal({ show })
  const closeModal = () => () => setModal({ show: null })

  const modalProps = (show: ModalState['show']) => ({ show: useModal.show === show, onClose: closeModal() })

  return {
    openModal,
    modalProps
  }
}

export { useDistributionCenters }