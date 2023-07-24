import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import { logisticApi } from "src/services/api"
import { MotoboyType } from "src/services/api/logistic/logistic.types"
import { formatPhone } from "src/utils/number.utils"

interface ModalSate {
  show: boolean
  data?: MotoboyType
}

interface useConfirmState {
  id?: string
  show?: boolean
  title?: string
  description?: string
}

const useMotoboys = () => {
  const [useModal, setModal] = useState<ModalSate>({ show: false })
  const [useConfirm, setConfirm] = useState<useConfirmState>({ })

  const { data: motoboys, refetch: refetchMotoboys } = useQuery('logistic/motoboys', logisticApi.getMotoboys, { initialData: [], refetchOnWindowFocus: false })

  const deleteMotoboyMutation = useMutation(async (id: string) => {
    toast.loading("Excluindo produto...")

    const hasDeleted = await logisticApi.deleteMotoboy({id})

    toast.dismiss()

    if (!hasDeleted) {
      toast.error(`Houve um erro ao excluir a mídia.`)
      return
    }

    toast.success(`Mídia excluída com sucesso!`)
    refetchMotoboys()
  })

  const tableData = motoboys.map(motoboy => ({
    id: motoboy.id,
    name: motoboy.name,
    phone: motoboy.phone ? formatPhone(motoboy.phone) : '',
    status: +motoboy.active,
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

  const openConfirm = (id: string) => () => {
    const motoboy = motoboys.find(p => p.id == id)
    
    setConfirm({
      id,
      show: true,
      title: 'Atenção',
      description: `Você tem certeza que deseja excluir o motoboy: ${motoboy.name}.`,
    })
  }

  const closeConfirm = async (isConfirmed?: boolean) => {
    isConfirmed && useConfirm.id && deleteMotoboyMutation.mutateAsync(useConfirm.id)
    setConfirm({})
  }

  return {
    tableData,
    useModal,
    closeModal,
    openModal,
    openConfirm,
    closeConfirm,
    useConfirm
  }
}

export { useMotoboys }