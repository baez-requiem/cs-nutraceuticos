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

export type UpdateBatchBodyType = {
  id: string
} & CreateNewBatchBodyType

export type UpdateBatchResponseType = {} & CreateNewBatchResponseType

export type StockProductType = {
  id: string
  name: string
  description: string | null
  notes: string | null
  active: boolean
  amount: number
  supply_quantity_notice: number | null
  total: number
  created_at: string
  updated_at: string | null
}

export type BatchType = {
  id: string
  notes?: string
  shipping?: number
  created_at: string
  updated_at: string | null
  products: {
    id_product: string
    quantity: number
    unit_amount: number
    created_at: string
    name: string
  }[]
}

export type GetStockProductsParamsType = {
  active?: boolean
  in_stock?: boolean
}