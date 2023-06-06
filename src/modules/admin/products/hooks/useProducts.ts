import { useState } from "react"
import { useMutation, useQuery } from 'react-query'
import { toast } from "react-toastify"
import { productsApi } from "src/services/api"
import { GetAllProductsResponse } from 'src/services/api/products/products.types'

interface useModalState {
  data?: GetAllProductsResponse[0]
  show: boolean
}

interface useConfirmState {
  id?: number
  show?: boolean
  title?: string
  description?: string
}

const useProducts = () => {
  const { data: products, isFetching, refetch } = useQuery(['products'], async () => {
    const response = await productsApi.getAllProducts()

    return response

  }, { initialData: [] })

  const mutation = useMutation(async (id: number) => {
    toast.loading("Excluindo produto...")

    const { status: hasDeleted } = await productsApi.deleteProduct(id)

    toast.dismiss()

    if (!hasDeleted) {
      toast.error(`Houve um erro ao excluir o produto.`)
      return
    }

    toast.success(`Produto excluído com sucesso!`)
    refetch()
  })

  const [useModal, setModal] = useState<useModalState>({ show: false })
  const [useConfirm, setConfirm] = useState<useConfirmState>({ })

  const openModal = (id?: GetAllProductsResponse[0]['id']) => {
    !!id
      ? setModal({ show: true, data: products.find(p => p.id == id) })
      : setModal({ show: true })
  }

  const closeModal = (hasRefetch?: boolean) => {
    hasRefetch && refetch()
    setModal({ show: false })
  }

  const openConfirm = (id: number) => {
    const product = products.find(p => p.id == id)
    
    setConfirm({
      id,
      show: true,
      title: 'Atenção',
      description: `Você tem certeza que deseja excluir o produto ${product.name}(#${id}).`,
    })
  }

  const closeConfirm = async (isConfirmed?: boolean) => {
    isConfirmed && useConfirm.id && mutation.mutateAsync(useConfirm.id)
    setConfirm({})

    if (!isConfirmed) {
      return
    }

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
    products
  }
}

export { useProducts }