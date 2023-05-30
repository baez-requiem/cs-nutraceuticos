import { useState } from "react"

const useDashboard = () => {

  const [showModal, setShowModal] = useState(false)

  return {
    showModal,
    setShowModal
  }
}

export { useDashboard }