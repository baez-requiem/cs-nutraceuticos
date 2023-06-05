import { httpClient } from "../httpClient"
import { ErrorResponse } from "../types"
import { LoginParams, LoginResponse } from "./login.types"

const login = async ({ username, password }: LoginParams): Promise<LoginResponse> => {
  try {
    const response = await httpClient.post('login', { username, password })
    const data: LoginResponse = response.data

    return data
  } catch (error) {
    console.log(error)

    return {
      error: { message: 'There was a problem with the request' }
    }
  }
}

export default { login }