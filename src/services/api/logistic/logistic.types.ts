export type Product = {
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

export type Media = {
  id: string
  name: string
  description: string | null
  notes: string | null
  active: boolean
  created_at: string
  updated_at: string | null
}

export type PaymentType = {
  id: string
  name: string
  notes: string | null
  created_at: string
}

export type SaleStatus = {
  id: string
  color?: string
  status: string
}

export type LogisticInfos = {
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
  motoboy?: MotoboyType
  delivery_type?: DeliveryType
  user: User
}

export type User = {
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

export type SaleProduct = {
  id: string
  id_product: string
  id_sale: string
  quantity: number
  sales_quantity: number
  created_at: string
  product: Product
}

export type Sale = {
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
  card_installments: number | null
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

export type DeliveryType = {
  id: string
  name: string
  notes: string | null
  created_at: string
}

export type MotoboyType = {
  id: string
  name: string
  active: boolean
  notes: string | null
  phone: string | null
  created_at: string
}


export type CreateNewLogisticInfoBodyType = {
  id_sale: string
  id_delivery_type: string
  id_sale_status: string
  id_motoboy?: string
  delivery_date: string
  delivery_value: number
  notes: string | null
}

export type GetSalesParams = {
  init_date?: string | null
  end_date?: string | null
  status?: string | null
  seller?: string | null
  client_name?: string | null
  client_phone?: string | null
}

export type CreateMotoboyBodyType = {
  name: string
  phone: string
  active: boolean
  notes: string | null
}

export type UpdateMotoboyBodyType = {
  id: string
} & CreateMotoboyBodyType