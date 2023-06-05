import { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import { numberFormat, onlyNumbers } from 'src/utils/number.utils'

const mockProducts = [
  { id: 'a1', name: 'Produto 1' },
  { id: 'b2', name: 'Produto 2' },
  { id: 'c3', name: 'Produto 3' },
  { id: 'd4', name: 'Produto 4' },
]

type ProductType = {
  id: string
  name: string
}

const useModalBatch = () => {
  const [selectValue, setSelectValue] = useState<string>('')
  const [products, setProducts] = useState<ProductType[]>(mockProducts)
  const [newBatchProducts, setNewBatchProducts] = useState<ProductType[]>([])
  const [shipping, setShipping] = useState('')

  const onShippingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = numberFormat(parseInt(onlyNumbers(evt.currentTarget.value))/100, 2, ',', '.')
    setShipping(value)
  }

  const handleSelect = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => setSelectValue(value)

  const addProduct = () => {
    const hasProduct = products.find(p => p.id === selectValue.toString())

    if (!hasProduct) { return }

    const nbpArr: ProductType[]  = [...newBatchProducts, hasProduct]
    
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
    const formProps = Object.fromEntries(formData);

    console.log(formData)
    console.log(formProps)
  }

  useEffect(() => {
    const slcValue = products.filter(p => !newBatchProducts.find(nbp => nbp.id === p.id))[0]?.id || ''

    setSelectValue(slcValue)
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