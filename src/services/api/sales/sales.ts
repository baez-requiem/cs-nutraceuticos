import { authenticatedRequest } from "../utils"
import { CreateNewSaleBodyType, CreateNewSaleResponseType, PaymentType } from "./sales.types"

const getPaymentTypes = async (): Promise<PaymentType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/payment-types',
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

export default { getPaymentTypes, createNewSale }