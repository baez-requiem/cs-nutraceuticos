import { Sale } from "src/services/api/logistic/logistic.types"

export const getSellersResume = (sales: Sale[] = []) => {
  const sellers = sales
    .map(sale => sale.user)
    .filter((seller, idx, arr) => arr.findIndex(t => t.id == seller.id) == idx)

  const paymentTypes = sales
    .map(sale => sale.payment_type)
    .filter((paymentType, index, array) => array.findIndex(t => t.id == paymentType.id) == index)

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

    const incomes = paymentTypes.map(paymentType => {
      const salesInPaymentType = salesBySeller.filter(sale => sale.payment_type_id === paymentType.id)

      const total = salesInPaymentType.reduce((pv, cv) => pv + cv.sale_products.reduce((pv2, cv2) => pv2 + (cv2.product.amount * cv2.quantity), 0) - cv.discounts, 0)

      return {
        id: paymentType.id,
        name: paymentType.name,
        total: total
      }
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
    .map(sale => sale.payment_type)
    .filter((paymentType, index, array) => array.findIndex(t => t.id == paymentType.id) == index)

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

    const incomes = paymentTypes.map(paymentType => {
      const salesInPaymentType = salesBySalesTeam.filter(sale => sale.payment_type_id === paymentType.id)

      const total = salesInPaymentType.reduce((pv, cv) => pv + cv.sale_products.reduce((pv2, cv2) => pv2 + (cv2.product.amount * cv2.quantity), 0) - cv.discounts, 0)

      return {
        id: paymentType.id,
        name: paymentType.name,
        total: total
      }
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
    .map(sale => sale.payment_type)
    .filter((paymentType, index, array) => array.findIndex(t => t.id == paymentType.id) == index)

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

    const incomes = paymentTypes.map(paymentType => {
      const salesInPaymentType = salesByMedia.filter(sale => sale.payment_type_id === paymentType.id)

      const total = salesInPaymentType.reduce((pv, cv) => pv + cv.sale_products.reduce((pv2, cv2) => pv2 + (cv2.product.amount * cv2.quantity), 0) - cv.discounts, 0)

      return {
        id: paymentType.id,
        name: paymentType.name,
        total: total
      }
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