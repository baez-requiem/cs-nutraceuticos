import { authenticatedRequest } from "../utils"

import { DayItemType, LastSaleType, SaleByType, StatisticsType } from './dashboard.types'

const getDailyStatistics = async (): Promise<StatisticsType|null> => {
  try {
    const response = await authenticatedRequest({
      url: '/dashboard/daily-statistics',
      method: 'get'
    })

    const data: StatisticsType = response.data

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const getMonthStatistics = async (): Promise<StatisticsType|null> => {
  try {
    const response = await authenticatedRequest({
      url: '/dashboard/month-statistics',
      method: 'get'
    })

    const data: StatisticsType = response.data

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const getLastSales = async (): Promise<LastSaleType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/dashboard/last-sales',
      method: 'get'
    })

    const data: LastSaleType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getDailySalesBySeller = async (): Promise<SaleByType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/dashboard/daily-sales-by-seller',
      method: 'get'
    })

    const data: SaleByType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getMonthSalesBySeller = async (): Promise<SaleByType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/dashboard/month-sales-by-seller',
      method: 'get'
    })

    const data: SaleByType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getDailySalesByMedia = async (): Promise<SaleByType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/dashboard/daily-sales-by-media',
      method: 'get'
    })

    const data: SaleByType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getMonthSalesByMedia = async (): Promise<SaleByType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/dashboard/month-sales-by-media',
      method: 'get'
    })

    const data: SaleByType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getDailySalesBySalesTeam = async (): Promise<SaleByType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/dashboard/daily-sales-by-sales-team',
      method: 'get'
    })

    const data: SaleByType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getMonthSalesBySalesTeam = async (): Promise<SaleByType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/dashboard/month-sales-by-sales-team',
      method: 'get'
    })

    const data: SaleByType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getMonthStatisticsResume = async (): Promise<DayItemType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/dashboard/month-statistics-resume',
      method: 'get'
    })

    const data: DayItemType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}


export default {
  getDailyStatistics,
  getMonthStatistics,
  getLastSales,
  getDailySalesBySeller,
  getMonthSalesBySeller,
  getDailySalesByMedia,
  getMonthSalesByMedia,
  getDailySalesBySalesTeam,
  getMonthSalesBySalesTeam,
  getMonthStatisticsResume
}