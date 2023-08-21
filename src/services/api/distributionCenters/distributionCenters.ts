import { authenticatedRequest } from "../utils"

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

export default {
  getAll
}