export type ProductType = {
  id: string
  name: string
  description: string | null
  notes: string | null
  active: boolean
  amount: number
  supply_quantity_notice: number | null
  created_at: string
  updated_at: string | null
}

export type CreateProductBody = {
  name: string
  description: string | null
  notes: string | null
  active: boolean
  amount: number
  supply_quantity_notice: number | null
}

export type UpdateProductBody = {
  id: string
} & CreateProductBody