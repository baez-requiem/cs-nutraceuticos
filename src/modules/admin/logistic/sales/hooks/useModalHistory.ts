import { useState, useEffect } from "react"

interface UseModalHistoryProps {
  show: boolean
}

const useModalHistory = ({ show }: UseModalHistoryProps) => {

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

export { useModalHistory }