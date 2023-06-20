import { authenticatedRequest } from "../utils"
import { PaymentType } from "./sales.types"

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

export default { getPaymentTypes }