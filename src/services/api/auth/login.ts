import { httpClient } from "../httpClient"
import { LoginParams, LoginResponse } from "./login.types"

const login = async ({ username, password }: LoginParams): Promise<LoginResponse> => {
  try {
    const response = await httpClient.post('auth/login', { username, password })
    const data: LoginResponse = response.data

    return data
  } catch (error) {
    console.log(error)

    const message = error?.response?.data?.message || 'There was a problem with the request'

    return {
      error: { message }
    }
  }
}

const matchUserRole = async (request: {id_user: string, roles: string[]}): Promise<{ match: boolean }> => {
  try {
    const response = await httpClient.post('/auth/match-user-role', request)
    const data: { match: boolean } = response.data
    
    return data
  } catch (error) {
    return { match: false }
  }
}

export default { login, matchUserRole }