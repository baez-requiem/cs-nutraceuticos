import { useState } from "react"
import { useQuery } from 'react-query'
import { productsApi } from "src/services/api"

interface useModalState {
  data?: any
  show: boolean
}

interface useConfirmState {
  id?: string | number
  show?: boolean
  title?: string
  description?: string
}

const useProducts = () => {
  const { data, isFetching } = useQuery(['products'], async () => {
    const response = await productsApi.getAllProducts()

    return response

  })

  console.log(data)

  const [useModal, setModal] = useState<useModalState>({ show: false })
  const [useConfirm, setConfirm] = useState<useConfirmState>({ })

  const openModal = (data?: any) => {
    !!data
      ? setModal({ show: true, data })
      : setModal({ show: true })
  }

  const closeModal = () => setModal({ show: false })

  const openConfirm = (id: string|number, name: string|number) => setConfirm({
    id,
    show: true,
    title: 'Atenção',
    description: `Você tem certeza que deseja excluir o produto ${name}(#${id}).`,
  })

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
    useConfirm
  }
}

export { useProducts }