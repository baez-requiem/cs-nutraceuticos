import { Sale } from "src/services/api/logistic/logistic.types";

export const getSaleDetails = (sale: Sale) => {
  const client = {
    name: sale?.name || '',
    phone: sale?.phone || '',
    rg: sale?.rg || '',
    cpf: sale?.cpf || '',
    email: sale?.email || '',
    cep: sale?.cep || '',
    state: sale?.state || '',
    city: sale?.city || '',
    neighborhood: sale?.neighborhood || '',
    address: sale?.address || '',
    address_number: sale?.address_number || '',
    complement: sale?.complement || '',
  }

  const products = sale?.sale_products.map(sp => ({
    name: sp.product.name,
    unit_value: sp.unit_value,
    quantity: sp.quantity,
    total: sp.quantity * sp.unit_value
  })) || []

  const payment_types = sale?.sale_payments.map(sp => ({
    id: sp.id_payment_type,
    amount: sp.amount,
    name: sp.payment_type.name,
    paid: sp.paid ? 'Pago' : 'Cobrar',
    card_installments: sp.id_payment_type === 'credit_card' ? sp.card_installments : null
  })) || []

  const infos = {
    media: sale?.media.name || '',
    sales_quantity: sale?.sales_quantity || '',
  }

  const discounts = sale?.discounts || 0
  const totalInProducts = products.reduce((pv, cv) => pv + cv.total , 0)
  const totalSale = totalInProducts - discounts

  return {
    client,
    discounts,
    totalSale,
    products,
    totalInProducts,
    infos,
    payment_types
  }
}