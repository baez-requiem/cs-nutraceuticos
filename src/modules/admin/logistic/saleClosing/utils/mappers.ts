import { Sale } from "src/services/api/logistic/logistic.types"
import { floatToReal, realToFloat } from "src/utils/number.utils"

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

export const getMotoboysResume = (sales: Sale[] = []) => {

  const motoboys = sales
    .filter(sale => !!sale.logistic_infos[0].motoboy?.id)
    .map(sale => sale.logistic_infos[0].motoboy)
    .filter((motoboy, index, array) => array.findIndex(t => t.id == motoboy.id) == index)

  const paymentTypes = sales
    .map(sale => sale.payment_type)
    .filter((paymentType, index, array) => array.findIndex(t => t.id == paymentType.id) == index)

  const resume = motoboys.map(motoboy => {

    const salesByMotoboy = sales.filter(sale => sale.logistic_infos[0].id_motoboy === motoboy.id)

    const incomes = paymentTypes.map(paymentType => {
      const salesInPaymentType = salesByMotoboy.filter(sale => sale.payment_type_id === paymentType.id)

      const total = salesInPaymentType.reduce((pv, cv) => pv + cv.sale_products.reduce((pv2, cv2) => pv2 + (cv2.product.amount * cv2.quantity), 0) - cv.discounts, 0)

      return {
        id: paymentType.id,
        name: paymentType.name,
        total: floatToReal(total)
      }
    })

    const deliveryValue = salesByMotoboy
      .map(sale => sale.logistic_infos[0].delivery_value)
      .reduce((pv, cv) => pv + cv , 0)

    const amountPayable = incomes
      .filter(income => income.id === 'cash')
      .map(income => realToFloat(income.total))
      .reduce((pv, cv) => pv + cv , 0)

    const balance = deliveryValue - amountPayable

    return {
      name: motoboy.name,
      incomes,
      balance,
      deliveryValue
    }
  })

  return resume
}