export type ProductType = {
  id: string
  name: string
  description: string | null
  notes: string | null
  active: boolean
  amount: number
  created_at: string
  updated_at: string | null
}

export type CreateProductBody = {
  name: string
  description: string | null
  notes: string | null
  active: boolean
  amount: number
}

export type UpdateProductBody = {
  id: string
} & CreateProductBody

export type GetProductsParamsType = {
  active?: boolean
}