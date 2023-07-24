import { authenticatedRequest } from "../utils"
import { CreateSaleTeamBody, SalesTeamType, UpdateSaleTeamBody } from "./salesTeam.types"

const getAllSalesTeam = async (): Promise<SalesTeamType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/sales-team',
      method: 'get'
    })

    const data: SalesTeamType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const createSaleTeam = async (body: CreateSaleTeamBody): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/sales-team',
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

const updateSaleTeam = async (body: UpdateSaleTeamBody): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/sales-team',
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

const deleteSaleTeam = async (id: string): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/sales-team',
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
  getAllSalesTeam,
  createSaleTeam,
  updateSaleTeam,
  deleteSaleTeam
}