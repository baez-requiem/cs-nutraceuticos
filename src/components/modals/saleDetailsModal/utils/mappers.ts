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
    complement: sale?.complement || '',
  }

  const products = sale?.sale_products.map(sp => ({
    name: sp.product.name,
    unit_value: sp.unit_value,
    quantity: sp.quantity,
    total: sp.quantity * sp.unit_value
  })) || []

  const discounts = sale?.discounts || 0
  const totalInProducts = products.reduce((pv, cv) => pv + cv.total , 0)
  const totalSale = totalInProducts - discounts

  return {
    client,
    discounts,
    totalSale,
    products,
    totalInProducts
  }
}