import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import { salesTeamApi } from "src/services/api"
import { SalesTeamType } from "src/services/api/salesTeam/salesTeam.types"

interface useModalState {
  data?: SalesTeamType
  show: boolean
}

interface useConfirmState {
  id?: string
  show?: boolean
  title?: string
  description?: string
}

const useSalesTeam = () => {
  const { data: salesTeam, isFetching, refetch } = useQuery(['sales-team'], async () => {
    const response = await salesTeamApi.getAllSalesTeam()

    return response

  }, { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false })

  const saleTeamMutation = useMutation(async (id: string) => {
    toast.loading("Excluindo produto...")

    const { status: hasDeleted } = await salesTeamApi.deleteSaleTeam(id)

    toast.dismiss()

    if (!hasDeleted) {
      toast.error(`Houve um erro ao excluir a equipe de vendas.`)
      return
    }

    toast.success(`Equipe de vendas excluída com sucesso!`)
    refetch()
  })

  const [useModal, setModal] = useState<useModalState>({ show: false })
  const [useConfirm, setConfirm] = useState<useConfirmState>({ })

  const openModal = (id?: SalesTeamType['id']) => {
    !!id
      ? setModal({ show: true, data: salesTeam.find(p => p.id == id) })
      : setModal({ show: true })
  }

  const closeModal = (hasRefetch?: boolean) => {
    hasRefetch && refetch()
    setModal({ show: false })
  }

  const openConfirm = (id: SalesTeamType['id']) => {
    const st = salesTeam.find(p => p.id == id)
    
    setConfirm({
      id,
      show: true,
      title: 'Atenção',
      description: `Você tem certeza que deseja excluir a equipe: ${st.name}.`,
    })
  }

  const closeConfirm = async (isConfirmed?: boolean) => {
    isConfirmed && useConfirm.id && saleTeamMutation.mutateAsync(useConfirm.id)
    setConfirm({})
  }

  return {
    useModal,
    closeModal,
    openModal,
    openConfirm,
    closeConfirm,
    useConfirm,
    salesTeam
  }
}

export { useSalesTeam }