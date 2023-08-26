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

export type CreateMovementType = {
  id_distribution_center: string
  id_distribution_center_rel?: string
  operation: 'IN' | 'OUT' | 'TRANSFER_IN' | 'TRANSFER_OUT'
  products: {
    id: string
    quantity: number
  }[]
}