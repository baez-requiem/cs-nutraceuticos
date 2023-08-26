import { authenticatedRequest, isStatus200, isStatus201 } from "../utils"
import { SaleBodyType, CreateNewSaleResponseType, PaymentType, SaleType } from "./sales.types"

const getPaymentTypes = async (): Promise<PaymentType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/sales/payment-types',
      method: 'get'
    })

    const data: PaymentType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const createNewSale = async (body: SaleBodyType): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/sales',
      method: 'post',
      data: body
    })

    return isStatus201(response)
  } catch (error) {
    console.log(error)
    return false
  }
}

const updateSale = async (body: SaleBodyType): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/sales',
      method: 'put',
      data: body
    })

    return isStatus200(response)
  } catch (error) {
    console.log(error)
    return null
  }
}

const getSales = async (): Promise<SaleType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/sales',
      method: 'get'
    })

    const data: SaleType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default { getPaymentTypes, createNewSale, getSales, updateSale }