import { useState } from 'react'

const mockProducts = [
  { id: 1, name: 'Produto 1' },
  { id: 2, name: 'Produto 2' },
  { id: 3, name: 'Produto 3' },
  { id: 4, name: 'Produto 4' },
]

const useModalBatch = () => {
  const [products, setProducts] = useState(mockProducts)

  return {
    products
  }
}

export { useModalBatch }