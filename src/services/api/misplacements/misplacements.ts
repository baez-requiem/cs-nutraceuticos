import { authenticatedRequest } from "../utils"
import { CreateNewMisplacementBodyType, CreateNewMisplacementResponseType, MisplacementType } from "./misplacements.types"

const getAllMisplacements = async (): Promise<MisplacementType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/stock/misplacements',
      method: 'get'
    })

    const data: MisplacementType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const createNewMisplacement = async (body: CreateNewMisplacementBodyType): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/stock/misplacements',
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

const deleteMisplacement = async (id: string): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/stock/misplacements',
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
  deleteMisplacement,
  getAllMisplacements,
  createNewMisplacement,
}