import { authenticatedRequest } from "../utils"
import { SalesTeamType } from "./salesTeam.types"

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

export default { getAllSalesTeam }