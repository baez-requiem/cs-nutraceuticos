
type FormProductType = {
  id_product: string
  quantity: number | string
  sales_quantity: number | string
  name: string
  amount: number
}

const products: FormProductType[] = []

export const initialDataFormNewSale = {
  name:  '',
  phone: '',

  media_id: '',
  payment_type_id: '',

  card_installments: '',
  paid: 0,

  rg: '',
  cpf: '',
  email: '',
  
  cep: '',
  city: '',
  state: '',
  address: '',
  neighborhood: '',
  complement: '',
  
  discounts: '',
  notes: '',

  products
}