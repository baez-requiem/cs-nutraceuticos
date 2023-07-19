
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

export const initialDataFormLogisticInfos = {
  id_sale_status: '',
  delivery_value: '',
  id_delivery_type: '',
  delivery_date: '',
  id_motoboy: '',
  notes: '',
}