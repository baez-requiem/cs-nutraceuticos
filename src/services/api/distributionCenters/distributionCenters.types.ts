export type DistributionCenterStockType = {
  id: string
  type: 'matriz' | 'motoboy'
  id_motoboy: string | null
  name: string
  created_at: string
  stock: {
    id: string
    name: string
    quantity: number
    supply_quantity_notice?: number
  }[]
}

export type UpdateDistributionCenterBodyType = {
  id: string
  name?: string
  supply_quantity_notice?: {
    id_product: string
    quantity: number
  }[]
}