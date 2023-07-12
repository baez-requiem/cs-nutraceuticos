import { authenticatedRequest } from "../utils"
import { CreateNewSaleBodyType, CreateNewSaleResponseType, PaymentType, SaleType } from "./sales.types"

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

const createNewSale = async (body: CreateNewSaleBodyType): Promise<CreateNewSaleResponseType|null> => {
  try {
    const response = await authenticatedRequest({
      url: '/sales',
      method: 'post',
      data: body
    })

    const data: CreateNewSaleResponseType = response.data

    return data
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

export default { getPaymentTypes, createNewSale, getSales }