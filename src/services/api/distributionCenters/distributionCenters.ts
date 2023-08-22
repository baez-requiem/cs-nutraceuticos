import { authenticatedRequest, isStatus200, isStatus201 } from "../utils"
import { CreateMovementType, DistributionCenterStockType, UpdateDistributionCenterBodyType } from "./distributionCenters.types"

const getAll = async () => {
  try {
    const response = await authenticatedRequest({
      url: '/distribution-centers',
      method: 'get'
    })

    const data = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getAllStock = async (): Promise<DistributionCenterStockType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/distribution-centers/stock',
      method: 'get'
    })

    const data: DistributionCenterStockType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const updateDistributionCenter = async (body: UpdateDistributionCenterBodyType): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/distribution-centers',
      method: 'put',
      data: body
    })

    return isStatus200(response)
  } catch (error) {
    console.log(error)
    return false
  }
}

const newMovement = async(body: CreateMovementType): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/distribution-centers/movement',
      method: 'post',
      data: body
    })

    return isStatus201(response)
  } catch (error) {
    console.log(error)
    return false
  }
}

export default {
  getAll,
  getAllStock,
  newMovement,
  updateDistributionCenter
}