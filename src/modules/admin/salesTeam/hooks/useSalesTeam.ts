import { useState } from "react"
import { useQuery } from "react-query"
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

  const [useModal, setModal] = useState<useModalState>({ show: false })
  const [useConfirm, setConfirm] = useState<useConfirmState>({ })

  const openModal = (id?: SalesTeamType['id']) => {
    !!id
      ? setModal({ show: true, data: salesTeam.find(p => p.id == id) })
      : setModal({ show: true })
  }

  const closeModal = () => setModal({ show: false })

  const openConfirm = (id: SalesTeamType['id']) => {
    const st = salesTeam.find(p => p.id == id)
    
    setConfirm({
      id,
      show: true,
      title: 'Atenção',
      description: `Você tem certeza que deseja excluir a equipe: ${st.name}.`,
    })
  }

  const closeConfirm = (isConfirmed?: boolean) => {

    if (!isConfirmed) {
      setConfirm({})
      return
    }

    // make

    setConfirm({})

    console.log('confirmado', isConfirmed)
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