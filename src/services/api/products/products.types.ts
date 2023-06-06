export type ProductType = {
  id: number
  name: string
  description: string | null
  notes: string | null
  active: boolean
  created_at: string
  updated_at: string | null
}

export type GetAllProductsResponse = ProductType[]

export type CreateProductBody = {
  name: string
  description: string | null
  notes: string | null
  active: boolean
}

export type UpdateProductBody = {
  id: number
} & CreateProductBody