export type MisplacementType = {
  id: string
  notes: string | null
  created_at: string

  products: {
    id_product: string
    quantity: number
    name: string
    created_at: string
  }[]
}

export type CreateNewMisplacementBodyType = {
  notes?: string
  products: {
    id_product: string
    quantity: number
  }[]
}

export type CreateNewMisplacementResponseType = {
  id: string
  notes: string | null
  created_at: string
}