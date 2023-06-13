export type LoginParams = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
  refreshToken: {
    id: string
    expiresIn: number
    userId: number
  }
  user: {
    role: string
  }
} | {
  error: {
    message: string
  }
}