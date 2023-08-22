import { authenticatedRequest, makeGETParams } from "../utils"

import {
  CreateProductBody,
  GetProductsParamsType,
  ProductType,
  UpdateProductBody
} from "./products.types"

const getAllProducts = async (params: GetProductsParamsType): Promise<ProductType[]> => {

  try {
    const response = await authenticatedRequest({
      url: makeGETParams('/products', params),
      method: 'get'
    })

    const data: ProductType[] = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const createProduct = async (body: CreateProductBody): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/products',
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

const updateProduct = async (body: UpdateProductBody): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/products',
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

const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const response = await authenticatedRequest({
      url: '/products',
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

export default { getAllProducts, createProduct, updateProduct, deleteProduct }