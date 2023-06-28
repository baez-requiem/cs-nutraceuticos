export type PaymentType = {
  id: string
  name: string
  notes: string | null
  created_at: string | Date
}

export type CreateNewSaleBodyType = {
  name: string
  phone: string

  media_id: string
  payment_type_id: string

  discounts: number
  
  rg?: string
  cpf?: string
  email?: string
  notes?: string

  cep?: string
  state?: string
  city?: string
  neighborhood?: string
  address?: string
  complement?: string

  products: {
    id_product: string
    quantity: number
    sales_quantity: number
  }[]
}

export type CreateNewSaleResponseType = {
  id: string
}