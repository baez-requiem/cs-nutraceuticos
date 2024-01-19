import { Sale } from "src/services/api/logistic/logistic.types"
import { floatToReal, realToFloat } from "src/utils/number.utils"

interface IncomeTotal {
  id: string
  name: string,
  total: number
}

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
    .flatMap(sale => sale.sale_payments)
    .map(paymentType => paymentType.payment_type)
    .filter((paymentType, index, array) => array.findIndex(t => t.id === paymentType.id) === index)

  const resume = motoboys.map(motoboy => {

    const salesByMotoboy = sales.filter(sale => sale.logistic_infos[0].id_motoboy === motoboy.id)

    const incomes: IncomeTotal[] = []

    const paymentsByMotoboy = paymentTypes
      .flatMap(paymentType => salesByMotoboy.filter(sale => sale.sale_payments.some(p => p.id_payment_type === paymentType.id)))
      .flatMap(sale => sale.sale_payments)
      .filter((paymentType, index, array) => array.findIndex(t => t.id === paymentType.id) === index)

    paymentsByMotoboy.forEach(payment => {
      const inArr = incomes.find(it => it.id === payment.id_payment_type)

      inArr
        ? (inArr.total += payment.amount)
        : incomes.push({
          id: payment.id_payment_type,
          name: payment.payment_type.name,
          total: payment.amount
        })
    })

    const deliveryValue = salesByMotoboy
      .map(sale => sale.logistic_infos[0].delivery_value)
      .reduce((pv, cv) => pv + cv, 0)

    const amountPayable = incomes
      .filter(income => income.id === 'cash')
      .map(income => income.total)
      .reduce((pv, cv) => pv + cv, 0)

    const balance = deliveryValue - amountPayable

    const products: { id: string, quantity: number, name: string }[] = []
    
    salesByMotoboy
      .flatMap(sale => sale.sale_products)
      .forEach(product => {
        const inArr = products.find(p => p.id === product.id)

        inArr
          ? (inArr.quantity += product.quantity)
          : products.push({
            id: product.id_product,
            name: product.product.name,
            quantity: product.quantity
          })
      })

    return {
      name: motoboy.name,
      incomes,
      balance,
      deliveryValue,
      products
    }
  })

  return resume
}

export const getTotalsResume = (sales: Sale[] = []) => {
  const paymentTypes = sales
    .flatMap(sale => sale.sale_payments)
    .map(paymentType => paymentType.payment_type)
    .filter((paymentType, index, array) => array.findIndex(t => t.id === paymentType.id) === index)

  const products = sales
    .map(sale => sale.sale_products.reduce((pv, cv) => pv + cv.quantity, 0))
    .reduce((pv, cv) => pv + cv, 0)

  const sales_quantity = sales.reduce((pv, cv) => pv + cv.sales_quantity, 0)

  const incomes: IncomeTotal[] = []

  const allPayments = paymentTypes
    .flatMap(paymentType => sales.filter(sale => sale.sale_payments.some(p => p.id_payment_type === paymentType.id)))
    .flatMap(sale => sale.sale_payments)
    .filter((paymentType, index, array) => array.findIndex(t => t.id === paymentType.id) === index)

  allPayments.forEach(payment => {
    const inArr = incomes.find(it => it.id === payment.id_payment_type)

    inArr
      ? (inArr.total += payment.amount)
      : incomes.push({
        id: payment.id_payment_type,
        name: payment.payment_type.name,
        total: payment.amount
      })
  })

  const total_incomes = incomes.reduce((pv, cv) => pv + cv.total, 0)

  const creditCard = incomes.find(inc => inc.id === 'credit_card')
  const debitCard = incomes.find(inc => inc.id === 'debit_card')

  if (creditCard && debitCard) {
    incomes.push({
      id: 'card',
      name: 'Cartão',
      total: creditCard.total + debitCard.total
    })
  }

  return {
    products,
    sales_quantity,
    total_incomes,
    incomes
  }
}