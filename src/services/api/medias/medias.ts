import { authenticatedRequest, makeGETParams } from "../utils"

import {
  CreateMediaBody,
  GetMediasParams,
  MediaType,
  UpdateMediaBody
} from "./medias.types"

const getAllMedias = async (params: GetMediasParams = {}): Promise<MediaType[]> => {

  try {
    const response = await authenticatedRequest({
      url: makeGETParams('/medias', params),
      method: 'get'
    })

    const data: MediaType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const createMedia = async (body: CreateMediaBody): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/medias',
      method: 'post',
      data: body
    })

    const isStatus201 = response.status === 201

    return isStatus201
  } catch (error) {
    console.log(error)
    return false
  }
}

const updateMedia = async (body: UpdateMediaBody): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/medias',
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

const deleteMedia = async (id: string): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/medias',
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

export default { getAllMedias, createMedia, updateMedia, deleteMedia }