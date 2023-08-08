import { Sale } from "src/services/api/logistic/logistic.types"
import { floatToReal } from "src/utils/number.utils"

export const getTotalSales = (sales: Sale[]) => {
  const result = sales.reduce((pv, cv) => pv + cv.sales_quantity, 0) || 0

  return result
}

export const getTotalAmount = (sales: Sale[]) => {
  const result = sales.reduce((pv, cv) => {
    const totalAmount = cv.sale_products.reduce((pv2, cv2) => pv2 + (cv2.product.amount * cv2.quantity), 0)

    const total = pv + totalAmount - cv.discounts

    return total
  }, 0) || 0

  return floatToReal(result)
}

export const getTotalProducts = (sales: Sale[]) => {
  const result = sales.reduce((pv, cv) => pv + cv.sale_products.reduce((pv2, cv2) => pv2 + cv2.quantity, 0), 0)

  return result
}

export const getTotalDeliveryValues = (sales: Sale[]) => {
  const result = sales.reduce((pv, cv) => pv + cv.logistic_infos[0].delivery_value, 0) || 0

  return floatToReal(result)
}