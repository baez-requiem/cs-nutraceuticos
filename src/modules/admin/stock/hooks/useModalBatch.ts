import { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import { numberFormat, onlyNumbers } from 'src/utils/number.utils'
import { productsApi } from 'src/services/api'
import { ProductType } from 'src/services/api/products/products.types'
import { useQuery } from 'react-query'

const useModalBatch = () => {
  const [selectValue, setSelectValue] = useState<string>('')
  const [newBatchProducts, setNewBatchProducts] = useState<ProductType[]>([])
  const [shipping, setShipping] = useState('')

  const { data: products } = useQuery(['products'], async () => {
    const response = await productsApi.getAllProducts()

    return response
  }, { initialData: [] })

  const onShippingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = numberFormat(parseInt(onlyNumbers(evt.currentTarget.value))/100, 2, ',', '.')
    setShipping(value)
  }

  const handleSelect = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => setSelectValue(value)

  const addProduct = () => {
    const hasProduct = products.find(p => p.id === parseInt(selectValue))

    if (!hasProduct) { return }

    const nbpArr: ProductType[]  = [...newBatchProducts, hasProduct]
    
    setNewBatchProducts(nbpArr)
  }

  const removeProduct = (id: number) => {
    const nbpArr = newBatchProducts.filter(p => p.id != id)

    setNewBatchProducts(nbpArr)
  }

  const selectOpts = products
    .filter(p => !newBatchProducts.find(nbp => nbp.id === p.id))
    .map(p => ({ label: p.name, value: p.id }))

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const formData = new FormData(evt.currentTarget);
    const formProps = Object.fromEntries(formData);
  }

  useEffect(() => {
    const slcValue = products.filter(p => !newBatchProducts.find(nbp => nbp.id === p.id))[0]?.id || ''

    setSelectValue(slcValue.toString())
  }, [newBatchProducts, products])

  return {
    selectValue,
    handleSelect,
    newBatchProducts,
    addProduct,
    removeProduct,
    selectOpts,
    onFormSubmit,
    shipping,
    onShippingChange
  }
}

export { useModalBatch }