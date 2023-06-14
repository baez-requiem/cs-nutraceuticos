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

const createSaleTeam = async (body: CreateSaleTeamBody): Promise<SalesTeamType|null> => {
  try {
    const response = await authenticatedRequest({
      url: '/sales-team',
      method: 'post',
      data: body
    })

    const data: SalesTeamType = response.data

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const updateSaleTeam = async (body: UpdateSaleTeamBody): Promise<SalesTeamType|null> => {
  try {
    const response = await authenticatedRequest({
      url: '/sales-team',
      method: 'put',
      data: body
    })

    const data: SalesTeamType = response.data

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const deleteSaleTeam = async (id: string): Promise<{ status: boolean }> => {
  try {
    const response = await authenticatedRequest({
      url: '/sales-team',
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
  getAllSalesTeam,
  createSaleTeam,
  updateSaleTeam,
  deleteSaleTeam
}