import { useState } from "react"
import { useMutation, useQuery } from 'react-query'
import { toast } from "react-toastify"
import { productsApi } from "src/services/api"
import { ProductType } from 'src/services/api/products/products.types'

interface useModalState {
  data?: ProductType
  show: boolean
}

interface useConfirmState {
  id?: string
  show?: boolean
  title?: string
  description?: string
}

const useProducts = () => {
  const { data: products, refetch } = useQuery(['products'], async () => {
    const toastId = toast.loading("Carregando produtos...")

    const response = await productsApi.getAllProducts()

    toast.dismiss(toastId)

    return response

  }, { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false })

  const mutation = useMutation(async (id: string) => {
    const toastId = toast.loading("Excluindo produto...")

    const hasDeleted = await productsApi.deleteProduct(id)

    toast.dismiss(toastId)

    if (!hasDeleted) {
      toast.error(`Houve um erro ao excluir o produto.`)
      return
    }

    toast.success(`Produto excluído com sucesso!`)
    refetch()
  })

  const [useModal, setModal] = useState<useModalState>({ show: false })
  const [useConfirm, setConfirm] = useState<useConfirmState>({ })

  const openModal = (id?: ProductType['id']) => {
    !!id
      ? setModal({ show: true, data: products.find(p => p.id == id) })
      : setModal({ show: true })
  }

  const closeModal = () => {
    setModal({ show: false })
  }

  const openConfirm = (id: string) => {
    const product = products.find(p => p.id == id)
    
    setConfirm({
      id,
      show: true,
      title: 'Atenção',
      description: `Você tem certeza que deseja excluir o produto: ${product.name}.`,
    })
  }

  const closeConfirm = async (isConfirmed?: boolean) => {
    isConfirmed && useConfirm.id && mutation.mutateAsync(useConfirm.id)
    setConfirm({})
  }

  return {
    useModal,
    closeModal,
    openModal,
    openConfirm,
    closeConfirm,
    useConfirm,
    products
  }
}

export { useProducts }