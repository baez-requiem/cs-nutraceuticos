import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { httpClient } from './httpClient'
import { getNewToken } from './auth/refreshToken'

interface AuthStorageData {
  token: string
  refreshToken: {
    id: string
    expiresIn: number
    userId: number
  }
}

interface Config extends AxiosRequestConfig {
  headers?: {
    Authorization?: string
  }
}

export const getAuthToken = () => {
  const authJson = localStorage.getItem('auth')
  const authData: AuthStorageData = JSON.parse(authJson)

  return authData.token
}

export const authenticatedRequest = async <T = any>(config: Config): Promise<AxiosResponse<T>> => {
  const token = getAuthToken()

  try {
    const requestConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`
      }
    }

    return await httpClient(requestConfig)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await getNewToken()

          const requestConfig = {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${newToken}`
            }
          }
          
          return await httpClient(requestConfig);
        } catch (error) {
          console.error('Erro ao obter um novo token de acesso:', error)
          localStorage.setItem('auth', null)
          window.location.href = '/'
          throw error
        }
      }
    }

    console.error('Erro na solicitação protegida:', error)
    throw error
  }
}

export const makeGETParams = (url: string = '', obj: { [key: string]: string | number | boolean }): string => {
  const params: string[] = [];

  for (const key in obj) {
    const value = obj[key]
    const param = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`

    params.push(param)
  }

  return `${url}?${params.join('&')}`
}