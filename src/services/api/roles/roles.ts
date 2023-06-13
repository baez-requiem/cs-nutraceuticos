import { authenticatedRequest } from "../utils"
import { RoleType } from "./roles.types"

const getAllRoles = async (): Promise<RoleType[]> => {
  try {
    const response = await authenticatedRequest({
      url: '/roles',
      method: 'get'
    })

    const data: RoleType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default { getAllRoles }