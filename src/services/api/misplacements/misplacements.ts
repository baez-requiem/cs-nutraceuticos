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
      method: 'post'
    })

    const data: CreateNewMisplacementResponseType = response.data

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export default { getAllMisplacements, createNewMisplacement }