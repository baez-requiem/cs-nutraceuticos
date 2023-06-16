import { authenticatedRequest } from "../utils"
import { BatchType, CreateNewBatchBodyType, CreateNewBatchResponseType, StockProductType } from "./stock.types"

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

const getBatches = async (): Promise<BatchType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/batches',
      method: 'get'
    })

    const data: BatchType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default { createNewBatch, getStockProducts, getBatches }