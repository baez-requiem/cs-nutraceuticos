import { authenticatedRequest } from "../utils"

const getSales = async (): Promise<Sale[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/logistic/sales',
      method: 'get'
    })

    const data: Sale[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }

}

export default {
  getSales
}