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

const getMotoboys = async (): Promise<MotoboyType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/logistic/motoboys',
      method: 'get'
    })

    const data: MotoboyType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const createNewLogisticInfo = async (body: CreateNewLogisticInfoBodyType): Promise<{ status: boolean }> => {
  try {
    const response = await authenticatedRequest({
      url: '/medias',
      method: 'post',
      data: body
    })

    const data: { status: boolean } = response.data

    return data
  } catch (error) {
    console.log(error)
    return { status: false }
  }
}

export default {
  getSales,
  getSaleStatus,
  getDeliveryTypes,
  getMotoboys,
  createNewLogisticInfo
}