import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"

import { usersApi } from "src/services/api"
import { UserType } from "src/services/api/users/users.types"

interface useModalState {
  data?: UserType
  show: boolean
}

interface useConfirmState {
  id?: string
  show?: boolean
  title?: string
  description?: string
}

const useUsers = () => {
  const [useModal, setModal] = useState<useModalState>({ show: false })
  const [useConfirm, setConfirm] = useState<useConfirmState>({ })

  const { data: users, refetch } = useQuery(['users'], async () => {
    const response = await usersApi.getAllUsers()

    return response
  }, { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false })

  const deleteUserMutation = useMutation(async (id: string) => {
    toast.loading("Excluindo produto...")

    const { status: hasDeleted } = await usersApi.deleteUser(id)

    toast.dismiss()

    if (!hasDeleted) {
      toast.error(`Houve um erro ao excluir o usuário.`)
      return
    }

    toast.success(`Usuário excluído com sucesso!`)
    refetch()
  })

  const openModal = (userId?: string) => {
    !!userId
      ? setModal({ show: true, data: users.find(user => user.id == userId) })
      : setModal({ show: true })
  }

  const closeModal = (hasRefetch?: boolean) => {
    hasRefetch && refetch()
    setModal({ show: false })
  }

  const openConfirm = (id: string, name: string) => setConfirm({
    id,
    show: true,
    title: 'Atenção',
    description: `Você tem certeza que deseja excluir o usuário: ${name}.`,
  })

  const closeConfirm = async (isConfirmed?: boolean) => {
    isConfirmed && useConfirm.id && deleteUserMutation.mutateAsync(useConfirm.id)
    setConfirm({})
  }


  const tableData = users.map(user => {
    
    return {
      id: user.id,
      name: user.name,
      role: user.role?.name,
      username: user.username,
      initial_date: user.initial_date
    }
  })

  return {
    useModal,
    closeModal,
    openModal,
    openConfirm,
    closeConfirm,
    useConfirm,
    tableData
  }
}

export { useUsers }