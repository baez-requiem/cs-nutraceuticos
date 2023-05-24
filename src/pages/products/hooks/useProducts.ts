import { useState } from "react"

interface useModalState {
  data?: any
  show: boolean
}

const useProducts = () => {
  const [useModal, setModal] = useState<useModalState>({ show: false })

  const openModal = (data?: any) => {
    !!data
      ? setModal({ show: true, data })
      : setModal({ show: true })
  }

  const closeModal = () => setModal({ show: false })

  return {
    useModal,
    closeModal,
    openModal
  }
}

export { useProducts }