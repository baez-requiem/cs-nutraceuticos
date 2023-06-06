import { authenticatedRequest } from "../utils"

import {
  CreateMediaBody,
  MediaType,
  UpdateMediaBody
} from "./medias.types"

const getAllMedias = async (): Promise<MediaType[]> => {

  try {
    const response = await authenticatedRequest({
      url: '/medias',
      method: 'get'
    })

    const data: MediaType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const createMedia = async (body: CreateMediaBody): Promise<MediaType|null> => {
  try {
    const response = await authenticatedRequest({
      url: '/medias',
      method: 'post',
      data: body
    })

    const data: MediaType = response.data

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const updateMedia = async (body: UpdateMediaBody): Promise<MediaType|null> => {
  try {
    const response = await authenticatedRequest({
      url: '/medias',
      method: 'put',
      data: body
    })

    const data: MediaType = response.data

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const deleteMedia = async (id: number): Promise<{ status: boolean }> => {
  try {
    const response = await authenticatedRequest({
      url: '/medias',
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

export default { getAllMedias, createMedia, updateMedia, deleteMedia }