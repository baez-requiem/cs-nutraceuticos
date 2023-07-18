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
  color?: string
  status: string
}

type LogisticInfos = {
  id: string
  id_sale_status: string
  delivery_value: number
  id_delivery_type: string | null
  delivery_date: string | Date
  id_motoboy: string | null
  id_sale: string
  notes: string | null
  created_at: string | Date
  sale_status: SaleStatus
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
  discounts: number | null
  notes: string | null
  created_at: string
  updated_at: string | null
  media: Media
  payment_type: PaymentType
  sales_team: string | null
  user: User
  sale_products: SaleProduct[]
  logistic_infos: LogisticInfos[]
}

type DeliveryType = {
  id: string
  name: string
  notes: string | null
  created_at: string
}

type MotoboyType = {
  id: string
  name: string
  active: boolean
  notes: string | null
  created_at: string
}


type CreateNewLogisticInfoBodyType = {
  id_sale: string
  id_delivery_type: string
  id_sale_status: string
  id_motoboy?: string
  delivery_date: string
  delivery_value: number
  notes: string | null
}