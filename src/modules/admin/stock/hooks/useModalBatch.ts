import { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import { floatToReal, numberFormat, onlyNumbers, realToFloat } from 'src/utils/number.utils'
import { productsApi, stockApi } from 'src/services/api'
import { ProductType } from 'src/services/api/products/products.types'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { newBatchSchema } from '../utils/schemas'
import { BatchType, CreateNewBatchBodyType } from 'src/services/api/stock/stock.types'
import { toast } from 'react-toastify'

type ProductFormType = {
  id_product: string
  quantity?: number
  unit_amount?: number
}

type NewBatchProductsState = {
  unit_amount?: number
  quantity?: number
} & ProductType

const useModalBatch = (
  show: boolean,
  onClose: () => void,
  data?: BatchType
) => {
  const [selectValue, setSelectValue] = useState<string>('')
  const [newBatchProducts, setNewBatchProducts] = useState<NewBatchProductsState[]>([])
  const [shipping, setShipping] = useState('0,00')
  const [notes, setNotes] = useState('')

  const queryClient = useQueryClient()

  const { data: products } = useQuery(['products'], async () => {
    const response = await productsApi.getAllProducts()

    return response
  }, { initialData: [], refetchOnWindowFocus: false })

  const stockMutation = useMutation(async (body: CreateNewBatchBodyType) => {
    toast.loading(`Inserindo dados...`)

    const dataId = data?.id

    const ok = dataId 
      ? await stockApi.updateBatch({...body, id: dataId})
      : await stockApi.createNewBatch(body)

    toast.dismiss()

    ok
      ? toast.success(`${dataId ? 'Lote atualizado' : 'Novo lote cadastrado'} com sucesso!`)
      : toast.error(`Houve um erro ao ${dataId ? 'atualizar o' : 'cadastrar um novo'} lote`)

    queryClient.refetchQueries({ queryKey: ['batches'] })
    queryClient.refetchQueries({ queryKey: ['stock-products'] })

    onClose()
  })

  const onShippingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = numberFormat(parseInt(onlyNumbers(evt.currentTarget.value))/100, 2, ',', '.')
    setShipping(value)
  }

  const handleSelect = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => setSelectValue(value)

  const addProduct = () => {
    const hasProduct = products.find(p => p.id === selectValue)

    if (!hasProduct) { return }

    const nbpArr: ProductType[] = [...newBatchProducts, hasProduct]
    
    setNewBatchProducts(nbpArr)
  }

  const removeProduct = (id: string) => {
    const nbpArr = newBatchProducts.filter(p => p.id != id)

    setNewBatchProducts(nbpArr)
  }

  const selectOpts = products
    .filter(p => !newBatchProducts.find(nbp => nbp.id === p.id))
    .map(p => ({ label: p.name, value: p.id }))

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const formData = new FormData(evt.currentTarget);
    const { shipping: _shipping, notes, ...formProps} = Object.fromEntries(formData);

    const products: ProductFormType[] = []

    Object.keys(formProps).forEach(key => {
      const field = key.split('--')[0] == 'unit_amount' ? 'unit_amount' : 'quantity'
      const id_product = key.split('--')[1]
      const value = field == 'quantity' ? parseInt(formProps[key].toString()) : realToFloat(formProps[key].toString())

      const inProductsArr = products.find(p => p.id_product === id_product)

      inProductsArr
        ? inProductsArr[field] = value
        : products.push({ id_product, [field]: value })
    })

    const validateData = newBatchSchema.safeParse({
      shipping: realToFloat(shipping.toString()),
      notes,
      products
    })

    if (validateData.success) {
      // @ts-ignore
      stockMutation.mutateAsync(validateData.data)
    }
  }

  useEffect(() => {
    const slcValue = products.filter(p => !newBatchProducts.find(nbp => nbp.id === p.id))[0]?.id || ''

    setSelectValue(slcValue.toString())
  }, [newBatchProducts, products])

  useEffect(() => {
    if (data) {
      const dataProducts = data.products.map(dp => dp.id_product)

      const npb = products
        .filter(p => dataProducts.includes(p.id))
        .map(p => {
          const dataProduct = data.products.find(dp => dp.id_product == p.id)

          return {
            ...p,
            unit_amount: dataProduct.unit_amount,
            quantity: dataProduct.quantity,
          }
        })

      setShipping(floatToReal(data.shipping))
      setNewBatchProducts(npb)
      setNotes(data.notes || '')
    } else {
      setNewBatchProducts([])
      setShipping('0,00')
      setNotes('')
    }
  }, [show])

  return {
    selectValue,
    handleSelect,
    newBatchProducts,
    addProduct,
    removeProduct,
    selectOpts,
    onFormSubmit,
    shipping,
    onShippingChange,
    notes,
    setNotes
  }
}

export { useModalBatch }