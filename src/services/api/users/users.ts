import { httpClient } from '../httpClient'
import { RoleType } from '../roles/roles.types'
import { authenticatedRequest, makeGETParams } from "../utils"
import { CreateUserBody, GetUserParams, UpdateUserBody, UserType } from "./users.types"

const getAllUsers = async (params: GetUserParams): Promise<UserType[]> => {

  try {
    const response = await authenticatedRequest({
      url: makeGETParams('/users', params),
      method: 'get'
    })

    const data: UserType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const updateUser = async (body: UpdateUserBody): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/users',
      method: 'put',
      data: body
    })

    const isStatus200 = response.status === 200

    return isStatus200
  } catch (error) {
    console.log(error)
    return false
  }
}

const createUser = async (body: CreateUserBody): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/users',
      method: 'post',
      data: body
    })

    const isStatus201 = response.status === 201

    return isStatus201
  } catch (error) {
    console.log(error)
    return null
  }
}

const deleteUser = async(id: string): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/users',
      method: 'delete',
      data: { id }
    })

    const isStatus200 = response.status === 200

    return isStatus200
  } catch (error) {
    console.log(error)
    return false
  }
}

const getRoles = async () => {
  try {
    const response = await httpClient.get('/users/roles')

    const data: RoleType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default {
  getAllUsers,
  updateUser,
  createUser,
  deleteUser,
  getRoles
}