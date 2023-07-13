type Product = {
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

type Media = {
  id: string
  name: string
  description: string | null
  notes: string | null
  active: boolean
  created_at: string
  updated_at: string | null
}

type PaymentType = {
  id: string
  name: string
  notes: string | null
  created_at: string
}

type SaleStatus = {
  id: string
  status: string
}

type User = {
  id: string
  name: string
  username: string
  password: string
  active: boolean
  phone: string | null
  rg: string | null
  cpf: string | null
  notes: string | null
  initial_date: string | null
  cep: string | null
  state: string | null
  city: string | null
  neighborhood: string | null
  address: string | null
  complement: string | null
  roleId: string
  salesTeamId: string | null
  created_at: string
  updated_at: string | null
}

type SaleProduct = {
  id: string
  id_product: string
  id_sale: string
  quantity: number
  sales_quantity: number
  created_at: string
  product: Product
}

type Sale = {
  id: string
  name: string
  phone: string
  rg: string | null
  cpf: string | null
  email: string | null
  cep: string | null
  state: string | null
  city: string | null
  neighborhood: string | null
  address: string | null
  complement: string | null
  media_id: string
  payment_type_id: string
  id_user: string
  id_sales_team: string | null
  id_sale_status: string
  discounts: number | null
  notes: string | null
  created_at: string
  updated_at: string | null
  media: Media
  payment_type: PaymentType
  sale_status: SaleStatus
  sales_team: string | null
  user: User
  sale_products: SaleProduct[]
}