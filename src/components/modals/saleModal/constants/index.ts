type FormProductType = {
  id_product: string
  quantity: number | string
  name: string
  amount: number
}

const products: FormProductType[] = []

export const initialDataFormSale = {
  name:  '',
  phone: '',

  media_id: '',
  payment_type_id: '',

  card_installments: '',
  paid: 0,
  sales_quantity: 0,

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