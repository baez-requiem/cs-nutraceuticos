import { useState } from "react"
import { useMutation, useQuery } from 'react-query'
import { toast } from "react-toastify"
import { mediasApi } from "src/services/api"
import { MediaType } from 'src/services/api/medias/medias.types'

interface useModalState {
  data?: MediaType
  show: boolean
}

interface useConfirmState {
  id?: string
  show?: boolean
  title?: string
  description?: string
}

const useMedias = () => {
  const { data: medias, refetch } = useQuery(['medias'], async () => {

    const toastId = toast.loading('Carregando mídias...')

    const response = await mediasApi.getAllMedias()

    toast.dismiss(toastId)

    return response

  }, { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false })

  const mediaMutation = useMutation(async (id: string) => {
    const toastId = toast.loading("Excluindo produto...")

    const hasDeleted = await mediasApi.deleteMedia(id)

    toast.dismiss(toastId)

    if (!hasDeleted) {
      toast.error(`Houve um erro ao excluir a mídia.`)
      return
    }

    toast.success(`Mídia excluída com sucesso!`)
    refetch()
  })

  const [useModal, setModal] = useState<useModalState>({ show: false })
  const [useConfirm, setConfirm] = useState<useConfirmState>({ })

  const openModal = (id?: MediaType['id']) => {
    !!id
      ? setModal({ show: true, data: medias.find(p => p.id == id) })
      : setModal({ show: true })
  }

  const closeModal = () => {
    setModal({ show: false })
  }

  const openConfirm = (id: string) => {
    const media = medias.find(p => p.id == id)
    
    setConfirm({
      id,
      show: true,
      title: 'Atenção',
      description: `Você tem certeza que deseja excluir a mídia: ${media.name}.`,
    })
  }

  const closeConfirm = async (isConfirmed?: boolean) => {
    isConfirmed && useConfirm.id && mediaMutation.mutateAsync(useConfirm.id)
    setConfirm({})
  }

  return {
    useModal,
    closeModal,
    openModal,
    openConfirm,
    closeConfirm,
    useConfirm,
    medias
  }
}

export { useMedias }