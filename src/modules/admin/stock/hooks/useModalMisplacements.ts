import { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { productsApi } from 'src/services/api'
import { ProductType } from 'src/services/api/products/products.types'
import { newMisplacementSchema } from '../utils/schemas'

type NewMisplacementsProductsState = {
  quantity?: number
} & ProductType

type ProductFormType = {
  id_product: string
  quantity: number
}

const useModalMisplacements = (show: boolean) => {
  const [selectValue, setSelectValue] = useState<string>('')
  const [newMisplacementProducts, setNewMisplacementProducts] = useState<NewMisplacementsProductsState[]>([])
  const [notes, setNotes] = useState('')

  const queryClient = useQueryClient()

  const { data: products } = useQuery('products', async () => {
    const response = await productsApi.getAllProducts()

    return response
  }, { initialData: [], refetchOnWindowFocus: false })

  const misplacementMutation = useMutation(async (body: CreateNewB) => {
    toast.loading(`Inserindo dados...`)

    const dataId = data?.id

    const batch = dataId 
      ? await stockApi.updateBatch({...body, id: dataId})
      : await stockApi.createNewBatch(body)

    toast.dismiss()

    batch?.id
      ? toast.success(`${dataId ? 'Lote atualizado' : 'Novo lote cadastrado'} com sucesso!`)
      : toast.error(`Houve um erro ao ${dataId ? 'atualizar o' : 'cadastrar um novo'} lote`)

    queryClient.refetchQueries({ queryKey: ['batches'] })
    queryClient.refetchQueries({ queryKey: ['stock-products'] })

    onClose()
  })

  const handleSelect = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => setSelectValue(value)
  const handleNotes = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setSelectValue(value)

  const addProduct = () => {
    const hasProduct = products.find(p => p.id === selectValue)

    if (!hasProduct) { return }

    const nmpArr: ProductType[] = [...newMisplacementProducts, hasProduct]
    
    setNewMisplacementProducts(nmpArr)
  }

  const removeProduct = (id: string) => {
    const nmpArr = newMisplacementProducts.filter(p => p.id != id)

    setNewMisplacementProducts(nmpArr)
  }

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const formData = new FormData(evt.currentTarget);
    const { shipping: _shipping, notes, ...formProps} = Object.fromEntries(formData);

    const products: ProductFormType[] = []

    Object.keys(formProps).forEach(key => {
      const id_product = key.split('--')[1]
      const value = parseInt(formProps[key].toString())

      const inProductsArr = products.find(p => p.id_product === id_product)

      inProductsArr
        ? inProductsArr.quantity = value
        : products.push({ id_product, quantity: value })
    })

    const validateData = newMisplacementSchema.safeParse({
      notes,
      products
    })

    if (validateData.success) {
      // @ts-ignore
      stockMutation.mutateAsync(validateData.data)
    }
  }


  const selectOpts = products
    .filter(p => !newMisplacementProducts.find(nmp => nmp.id === p.id))
    .map(p => ({ label: p.name, value: p.id }))

  useEffect(() => {
    const slcValue = products.filter(p => !newMisplacementProducts.find(nmp => nmp.id === p.id))[0]?.id || ''

    setSelectValue(slcValue.toString())
  }, [newMisplacementProducts, products])

  useEffect(() => {
    setNewMisplacementProducts([])
    setNotes('')
  }, [show])

  return {
    selectValue,
    handleSelect,
    newMisplacementProducts,
    addProduct,
    removeProduct,
    selectOpts,
    onFormSubmit,
    notes,
    handleNotes
  }
}

export { useModalMisplacements }