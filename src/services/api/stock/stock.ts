import { authenticatedRequest, makeGETParams } from "../utils"
import { BatchType, CreateNewBatchBodyType, CreateNewBatchResponseType, GetStockProductsParamsType, StockProductType, UpdateBatchBodyType, UpdateBatchResponseType } from "./stock.types"

const createNewBatch = async (body: CreateNewBatchBodyType): Promise<CreateNewBatchResponseType|null> => {
  try {
    const response = await authenticatedRequest({
      url: '/stock/batches',
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

const updateBatch = async (body: UpdateBatchBodyType): Promise<UpdateBatchResponseType|null> => {
  try {
    const response = await authenticatedRequest({
      url: '/stock/batches',
      method: 'put',
      data: body
    })

    const data: UpdateBatchResponseType = response.data

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const getStockProducts = async (params: GetStockProductsParamsType = {}): Promise<StockProductType[]> => {
  try {
    const response = await authenticatedRequest({
      url: makeGETParams('/stock/products', params),
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
      url: '/stock/batches',
      method: 'get'
    })

    const data: BatchType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const deleteBatch = async (id: string): Promise<{ status: boolean }> => {
  try {
    const response = await authenticatedRequest({
      url: '/stock/batches',
      method: 'delete',
      data: { id }
    })

    const data: { status: boolean } = response.data

    return data
  } catch (error) {
    console.log(error)
    return { status: false }
  }
}

export default {
  createNewBatch,
  getStockProducts,
  getBatches,
  deleteBatch,
  updateBatch
}