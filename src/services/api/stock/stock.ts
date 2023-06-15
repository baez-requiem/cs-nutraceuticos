import { authenticatedRequest } from "../utils"
import { CreateNewBatchBodyType, CreateNewBatchResponseType, StockProductType } from "./stock.types"

const createNewBatch = async (body: CreateNewBatchBodyType): Promise<CreateNewBatchResponseType|null> => {
  try {
    const response = await authenticatedRequest({
      url: '/stock-new-batch',
      method: 'post',
      data: body
    })

    const data: CreateNewBatchResponseType = response.data

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const getStockProducts = async (): Promise<StockProductType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/stock-products',
      method: 'get'
    })

    const data: StockProductType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default { createNewBatch, getStockProducts }