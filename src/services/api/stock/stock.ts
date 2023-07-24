import { authenticatedRequest, makeGETParams } from "../utils"
import { BatchType, CreateNewBatchBodyType, CreateNewBatchResponseType, GetStockProductsParamsType, StockProductType, UpdateBatchBodyType, UpdateBatchResponseType } from "./stock.types"

const createNewBatch = async (body: CreateNewBatchBodyType): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/stock/batches',
      method: 'post',
      data: body
    })

    const isStatus201 = response.status === 201

    return isStatus201
  } catch (error) {
    console.log(error)
    return false
  }
}

const updateBatch = async (body: UpdateBatchBodyType): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/stock/batches',
      method: 'put',
      data: body
    })

    const isStatus200 = response.status === 200

    return isStatus200
  } catch (error) {
    console.log(error)
    return false
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

const deleteBatch = async (id: string): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/stock/batches',
      method: 'delete',
      data: { id }
    })

    const isStatus200 = response.status === 200

    return isStatus200
  } catch (error) {
    console.log(error)
    return false
  }
}

export default {
  createNewBatch,
  getStockProducts,
  getBatches,
  deleteBatch,
  updateBatch
}