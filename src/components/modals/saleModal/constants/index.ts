type FormProductType = {
  id_product: string
  quantity: number | string
  name: string
  amount: number
}

type FormPaymentType = {
  name: string
  id_payment_type: string
  amount: string
  card_installments: string
  paid: string
}

const products: FormProductType[] = []
const payment_types: FormPaymentType[] = [{
  id_payment_type: 'pix',
  name: 'pix',
  amount: '0,00',
  card_installments: '1',
  paid: '1'
}]

export const initialDataFormSale = {
  name:  '',
  phone: '',

  media_id: '',
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

  products,
  payment_types
}

export const paidOpts = [
  { label: "Pago", value: 1 },
  { label: "Cobrar", value: 0 }
]