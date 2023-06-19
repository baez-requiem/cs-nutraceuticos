import { useState } from 'react'

interface ModalState {
  data?: any
  opened: null | 'newBatch'
}

const useStock = () => {
  const [useModal, setModal] = useState<ModalState>({ opened: null })

  const openModal = (modal: ModalState['opened'], data?: any) => setModal({ opened: modal, data })

  const closeModal = () => setModal({ opened: null })

  return {
    openModal,
    closeModal,
    useModal
  }
}

export { useStock }