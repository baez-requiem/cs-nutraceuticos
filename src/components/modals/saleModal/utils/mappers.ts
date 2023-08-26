import { Sale } from "src/services/api/logistic/logistic.types"
import { floatToReal, formatPhone, realToFloat } from "src/utils/number.utils"
import { initialDataFormSale } from "../constants"

export const parseSaleFormValues = (sale: Sale) => {

  const products = sale.sale_products.map(sp => ({
    id_product: sp.id_product,
    quantity: sp.quantity,
    amount: sp.unit_value,
    name: sp.product.name
  }))

  const payment_types = sale.sale_payments.map(sp => ({
    id_payment_type: sp.id_payment_type,
    name: sp.payment_type.name,
    amount: floatToReal(sp.amount),
    card_installments: sp.card_installments || '',
    paid: +sp.paid + '',
  }))

  const values = {
    name: sale.name,
    phone: formatPhone(sale.phone),

    rg: sale.rg || '',
    cpf: sale.cpf || '',
    email: sale.email || '',

    cep: sale.cep || '',
    city: sale.city || '',
    state: sale.state || '',
    address: sale.address || '',
    neighborhood: sale.neighborhood || '',
    complement: sale.complement || '',

    media_id: sale.media_id,
    sales_quantity: sale.sales_quantity,

    discounts: floatToReal(sale.discounts || 0),
    notes: sale.notes || '',

    products,
    payment_types
  } as typeof initialDataFormSale

  return values
}

export const parseSaleFormSubmit = ({ payment_types, products, ...values }: typeof initialDataFormSale, id?: string) => {

  const mapProducts = products.map(p => ({
    id_product: p.id_product,
    quantity: parseInt(p.quantity.toString()),
  }))

  const mapPaymentTypes = payment_types.map(pt => ({
    id_payment_type: pt.id_payment_type,
    amount: realToFloat(pt.amount),
    card_installments: pt.card_installments ? parseInt(pt.card_installments) : null,
    paid: !!parseInt(pt.paid.toString()),
  }))

  const sale = {
    ...values,
    discounts: realToFloat(values.discounts.toString() || '0'),
    products: mapProducts,
    payment_types: mapPaymentTypes
  }
  
  if (id) {
    sale['id'] = id
  }

  return sale
}