import { authenticatedRequest } from "../utils"
import { CreateUserBody, UpdateUserBody, UserType } from "./users.types"

const getAllUsers = async (): Promise<UserType[]> => {

  try {
    const response = await authenticatedRequest({
      url: '/users',
      method: 'get'
    })

    const data: UserType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const updateUser = async (body: UpdateUserBody): Promise<UserType|null> => {
  try {
    const response = await authenticatedRequest({
      url: '/users',
      method: 'put',
      data: body
    })

    const data: UserType = response.data

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const createUser = async (body: CreateUserBody): Promise<UserType|null> => {
  try {
    const response = await authenticatedRequest({
      url: '/users',
      method: 'post',
      data: body
    })

    const data: UserType = response.data

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const deleteUser = async(id: string): Promise<{ status: boolean }> => {
  try {
    const response = await authenticatedRequest({
      url: '/users',
      method: 'delete',
      data: { id }
    })

    const data: { status: boolean } = response.data

    return data
  } catch (error) {
    console.log(error)
    return { status: false }
  }
}

export default {
  getAllUsers,
  updateUser,
  createUser,
  deleteUser
}