export const mapSaleProductsLogistic = (
  sale_products: Sale['sale_products'] = []
) => sale_products.map(sp => ({
  name: sp.product.name,
  quantity: sp.quantity,
  sales_quantity: sp.sales_quantity,
  unit_value: sp.product.amount,
  total: sp.quantity * sp.product.amount
}))

export const totalSaleValue = (sale: Sale, withDiscount?: boolean) => {
  if (!sale) {
    return 0
  }

  const total = sale.sale_products.reduce((pv, cv) => pv + (cv.quantity * cv.product.amount), 0)

  return withDiscount ? (total - sale.discounts) : total
}