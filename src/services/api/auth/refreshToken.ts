import { httpClient } from "../httpClient"

interface RefreshTokenData {
  token: string
  refreshToken?: {
    id: string
    expiresIn: number
    userId: string
  }
}

export const getNewToken = async () => {
  const authJson = localStorage.getItem('auth')
  const authData = JSON.parse(authJson)

  const refreshToken = authData?.refreshToken?.id || ''

  try {
    const response = await httpClient.post('/auth/refresh-token', {
      refresh_token: refreshToken
    })

    const data: RefreshTokenData = response.data

    localStorage.setItem('auth', JSON.stringify({...authData, ...data}))

    return data.token
  } catch (error) {
    // Lidar com erros ao solicitar um novo token
    console.error('Erro ao solicitar um novo token de acesso:', error);
    throw error;
  }
}