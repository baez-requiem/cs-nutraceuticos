import { authenticatedRequest, makeGETParams } from "../utils"
import { CreateMotoboyBodyType, CreateNewLogisticInfoBodyType, DeliveryType, GetMotoboysParamsType, GetSalesParams, MotoboyType, Sale, SaleStatus, UpdateMotoboyBodyType } from "./logistic.types"

const getSales = async (params?: GetSalesParams): Promise<Sale[]> => {
  try {
    const response = await authenticatedRequest({
      url: makeGETParams('/logistic/sales', params),
      method: 'get'
    })

    const data: Sale[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }

}

const getSaleStatus = async (): Promise<SaleStatus[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/logistic/sale-status',
      method: 'get'
    })

    const data: SaleStatus[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }

}

const getDeliveryTypes = async (): Promise<DeliveryType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/logistic/delivery-types',
      method: 'get'
    })

    const data: DeliveryType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }

}

const getMotoboys = async (params: GetMotoboysParamsType = {}): Promise<MotoboyType[]> => {
  try {
    const response = await authenticatedRequest({
      url: makeGETParams('/logistic/motoboys', params),
      method: 'get'
    })

    const data: MotoboyType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const createNewLogisticInfo = async (body: CreateNewLogisticInfoBodyType): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/logistic/logistic-info',
      method: 'post',
      data: body
    })

    const isStatus201 = response.status == 201

    return isStatus201
  } catch (error) {
    console.log(error)
    return false
  }
}

const createMotoboy = async (body: CreateMotoboyBodyType): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/logistic/motoboys',
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

const updateMotoboy = async (body: UpdateMotoboyBodyType): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/logistic/motoboys',
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

const deleteMotoboy = async (body: { id: string }): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/logistic/motoboys',
      method: 'delete',
      data: body
    })

    const isStatus200 = response.status === 200

    return isStatus200
  } catch (error) {
    console.log(error)
    return false
  }
}

export default {
  getSales,
  createMotoboy,
  deleteMotoboy,
  updateMotoboy,
  getSaleStatus,
  getDeliveryTypes,
  getMotoboys,
  createNewLogisticInfo
}