export type PaymentType = {
  id: string
  name: string
  notes: string | null
  created_at: string | Date
}

export type SaleBodyType = {
  id?: string
  
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

export type SaleType = {
  id: string
  name: string
  phone: string | null
  rg: string | null
  cpf: string | null
  email: string | null
  cep: string | null
  state: string | null
  neighborhood: string | null
  address: string | null
  complement: string | null
  payment_type_id: string
  id_user: string
  id_sales_team: string | null
  discounts: number
  notes: string | null
  created_at: string | Date
  updated_at: string | Date | null
}