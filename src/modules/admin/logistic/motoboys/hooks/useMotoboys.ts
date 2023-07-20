import { useState } from "react"
import { useQuery } from "react-query"
import { logisticApi } from "src/services/api"

interface ModalSate {
  show: boolean
  data?: MotoboyType
}

const useMotoboys = () => {
  const [useModal, setModal] = useState<ModalSate>({ show: false })

  const { data: motoboys } = useQuery('logistic/sales', logisticApi.getMotoboys, { initialData: [], refetchOnWindowFocus: false })

  const tableData = motoboys.map(motoboy => ({
    id: motoboy.id,
    name: motoboy.name,
    status: 0
  }))

  const closeModal = () => setModal({ show: false })
  const openModal = (id?: string) => () => {
    if (id) {
      setModal({
        show: true,
        data: motoboys.find(motoboy => motoboy.id === id) 
      })
    } else {
      setModal({ show: true })
    }
  }

  return {
    tableData,
    useModal,
    closeModal,
    openModal
  }
}

export { useMotoboys }