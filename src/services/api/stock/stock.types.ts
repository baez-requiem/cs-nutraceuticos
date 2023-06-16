export type CreateNewBatchBodyType = {
  shipping: number
  notes?: string
  products: {
    id_product: string
    quantity: number
    unit_amount: number
  }[]
}

export type CreateNewBatchResponseType = {
  id: string
  notes: string | null
  shipping: number
  created_at: string
  updated_at: string | null
}

export type StockProductType = {
  id: string
  name: string
  description: string | null
  notes: string | null
  active: boolean
  amount: number
  quantity: number
  created_at: string
  updated_at: string | null
}

export type BatchType = {
  id: string
  notes?: string
  shipping?: number
  created_at: string
  updated_at: string | null
  BatchesProducts: {
    id: string
    id_batch: string
    id_product: string
    quantity: number
    unit_amount: number
    created_at: string
    updated_at: string | null
    product: {
      name: string
    }
  }[]
}