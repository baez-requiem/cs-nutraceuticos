export type StatisticsType = {
  totalSales: number
  totalProducts: number
  totalAmount: number
}

export type LastSaleType = {
  id: string
  discounts: number
  total: number
  created_at: string
  seller: { name: string }
  products: {
    name: number
    amount: number
    quantity: number
  }[]
}

export type SaleByType = {
  id: string
  name: string
  totalSales: number
  totalProducts: number
  totalAmount: number
}

export type DayItemType = {
  day: number
  amount: number
}

export type SellerDashboard = {
  totalSalesMonth: number
  totalSalesWeek: number
  totalSalesDay: number
  totalSalesPerDay: { label: string, value: number }[]
}