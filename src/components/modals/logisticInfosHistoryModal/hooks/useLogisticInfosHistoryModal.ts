import { useState, useEffect } from "react"

interface useLogisticInfosHistoryModalProps {
  show: boolean
}

const useLogisticInfosHistoryModal = ({ show }: useLogisticInfosHistoryModalProps) => {

  const [infosToShow, setInfosToShow] = useState<string[]>([])

  const toggleShow = (id: string) => () => {
    setInfosToShow(state => {
      return state.includes(id)
        ? state.filter(s => s !== id)
        : [...state, id]
    })
  }

  useEffect(() => {
    !show && setInfosToShow([])
  }, [show])

  return {
    infosToShow,
    toggleShow
  }
}

export { useLogisticInfosHistoryModal }