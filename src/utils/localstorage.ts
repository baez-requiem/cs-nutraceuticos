type AuthType = {
  token: string
  refreshToken: {
    id: string
    expiresIn: number
    userId: string
  }
}

export const getLocalStorageData = <T>(key: string): T | null => {
  const dataJSON = localStorage.getItem(key)

  const data = JSON.parse(dataJSON) as T

  return data
}

export const getStorageAuth: () => AuthType|null = () => getLocalStorageData('auth')
