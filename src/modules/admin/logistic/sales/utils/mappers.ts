import { Sale } from "src/services/api/logistic/logistic.types"

interface IncomeTotal {
  id: string
  name: string,
  total: number
}

export const getSellersResume = (sales: Sale[] = []) => {
  const sellers = sales
    .map(sale => sale.user)
    .filter((seller, idx, arr) => arr.findIndex(t => t.id == seller.id) == idx)

  const paymentTypes = sales
    .flatMap(sale => sale.sale_payments)
    .map(paymentType => paymentType.payment_type)
    .filter((paymentType, index, array) => array.findIndex(t => t.id === paymentType.id) === index)

  const resume = sellers.map(seller => {
    const salesBySeller = sales.filter(sale => sale.id_user === seller.id)
    const productsBySeller = salesBySeller.map(({ sale_products }) => sale_products.map(product => ({
      id: product.product.id,
      name: product.product.name,
      quantity: product.quantity,
      amount: product.product.amount,
    })))

    const products: typeof productsBySeller[0] = []

    productsBySeller.forEach(ps => {
      ps.forEach(p => {
        const inSumProducts = products.find(sp => sp.id === p.id)

        inSumProducts
          ? (inSumProducts.quantity += p.quantity)
          : products.push(p)
      })
    })

    const incomes: IncomeTotal[] = []

    const paymentsBySeller = paymentTypes
      .flatMap(paymentType => salesBySeller.filter(sale => sale.sale_payments.some(p => p.id_payment_type === paymentType.id)))
      .flatMap(sale => sale.sale_payments)
      .filter((paymentType, index, array) => array.findIndex(t => t.id === paymentType.id) === index)

    paymentsBySeller.forEach(payment => {
      const inArr = incomes.find(it => it.id === payment.id_payment_type)

      inArr
        ? (inArr.total += payment.amount)
        : incomes.push({
          id: payment.id_payment_type,
          name: payment.payment_type.name,
          total: payment.amount
        })
    })

    const totalIncomes = incomes.reduce((pv, cv) => pv + cv.total, 0)
    const totalSales = salesBySeller.reduce((pv, cv) => pv + cv.sales_quantity, 0)
    const totalProducts = products.reduce((pv, cv) => pv + cv.quantity, 0)

    return {
      name: seller.name,
      incomes,
      totalIncomes,
      totalSales,
      products,
      totalProducts
    }
  })

  return resume
}

export const getSalesTeamsResume = (sales: Sale[] = []) => {
  const salesTeams = sales
    .map(sale => sale.sales_team)
    .filter((salesTeam, idx, arr) => salesTeam?.id && (arr.findIndex(t => t?.id === salesTeam?.id) == idx))

  const paymentTypes = sales
    .flatMap(sale => sale.sale_payments)
    .map(paymentType => paymentType.payment_type)
    .filter((paymentType, index, array) => array.findIndex(t => t.id === paymentType.id) === index)

  const resume = salesTeams.map(salesTeam => {
    const salesBySalesTeam = sales.filter(sale => sale.id_sales_team === salesTeam.id)

    const productsBySalesTeam = salesBySalesTeam.map(({ sale_products }) => sale_products.map(product => ({
      id: product.product.id,
      name: product.product.name,
      quantity: product.quantity,
      amount: product.product.amount,
    })))

    const products: typeof productsBySalesTeam[0] = []

    productsBySalesTeam.forEach(ps => {
      ps.forEach(p => {
        const inSumProducts = products.find(sp => sp.id === p.id)

        inSumProducts
          ? (inSumProducts.quantity += p.quantity)
          : products.push(p)
      })
    })

    const incomes: IncomeTotal[] = []

    const paymentsBySalesTeam = paymentTypes
      .flatMap(paymentType => salesBySalesTeam.filter(sale => sale.sale_payments.some(p => p.id_payment_type === paymentType.id)))
      .flatMap(sale => sale.sale_payments)
      .filter((paymentType, index, array) => array.findIndex(t => t.id === paymentType.id) === index)

    paymentsBySalesTeam.forEach(payment => {
      const inArr = incomes.find(it => it.id === payment.id_payment_type)

      inArr
        ? (inArr.total += payment.amount)
        : incomes.push({
          id: payment.id_payment_type,
          name: payment.payment_type.name,
          total: payment.amount
        })
    })

    const totalIncomes = incomes.reduce((pv, cv) => pv + cv.total, 0)
    const totalSales = salesBySalesTeam.reduce((pv, cv) => pv + cv.sales_quantity, 0)
    const totalProducts = products.reduce((pv, cv) => pv + cv.quantity, 0)

    return {
      name: salesTeam.name,
      incomes,
      totalIncomes,
      totalSales,
      products,
      totalProducts
    }
  })

  return resume
}

export const getMediasResume = (sales: Sale[] = []) => {
  const medias = sales
    .map(sale => sale.media)
    .filter((media, idx, arr) => arr.findIndex(t => t?.id === media?.id) == idx)

  const paymentTypes = sales
    .flatMap(sale => sale.sale_payments)
    .map(paymentType => paymentType.payment_type)
    .filter((paymentType, index, array) => array.findIndex(t => t.id === paymentType.id) === index)

  const resume = medias.map(media => {
    const salesByMedia = sales.filter(sale => sale.media_id === media.id)

    const productsByMedia = salesByMedia.map(({ sale_products }) => sale_products.map(product => ({
      id: product.product.id,
      name: product.product.name,
      quantity: product.quantity,
      amount: product.product.amount,
    })))

    const products: typeof productsByMedia[0] = []

    productsByMedia.forEach(ps => {
      ps.forEach(p => {
        const inSumProducts = products.find(sp => sp.id === p.id)

        inSumProducts
          ? (inSumProducts.quantity += p.quantity)
          : products.push(p)
      })
    })

    const incomes: IncomeTotal[] = []

    const paymentsByMedia = paymentTypes
      .flatMap(paymentType => salesByMedia.filter(sale => sale.sale_payments.some(p => p.id_payment_type === paymentType.id)))
      .flatMap(sale => sale.sale_payments)
      .filter((paymentType, index, array) => array.findIndex(t => t.id === paymentType.id) === index)

    paymentsByMedia.forEach(payment => {
      const inArr = incomes.find(it => it.id === payment.id_payment_type)

      inArr
        ? (inArr.total += payment.amount)
        : incomes.push({
          id: payment.id_payment_type,
          name: payment.payment_type.name,
          total: payment.amount
        })
    })

    const totalIncomes = incomes.reduce((pv, cv) => pv + cv.total, 0)
    const totalSales = salesByMedia.reduce((pv, cv) => pv + cv.sales_quantity, 0)
    const totalProducts = products.reduce((pv, cv) => pv + cv.quantity, 0)

    return {
      name: media.name,
      incomes,
      totalIncomes,
      totalSales,
      products,
      totalProducts
    }
  })

  return resume
}