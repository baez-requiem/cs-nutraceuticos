import { authenticatedRequest } from "../utils"
import { CreateNewMisplacementBodyType, CreateNewMisplacementResponseType, MisplacementType } from "./misplacements.types"

const getAllMisplacements = async (): Promise<MisplacementType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/misplacements',
      method: 'get'
    })

    const data: MisplacementType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const createNewMisplacement = async (body: CreateNewMisplacementBodyType): Promise<CreateNewMisplacementResponseType|null> => {
  try {
    const response = await authenticatedRequest({
      url: '/misplacements',
      method: 'post',
      data: body
    })

    const data: CreateNewMisplacementResponseType = response.data

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const deleteMisplacement = async (id: string): Promise<{ status: boolean }> => {
  try {
    const response = await authenticatedRequest({
      url: '/misplacements',
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
  deleteMisplacement,
  getAllMisplacements,
  createNewMisplacement,
}