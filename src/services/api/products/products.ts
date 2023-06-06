import { authenticatedRequest } from "../utils"

import {
  CreateProductBody,
  GetAllProductsResponse,
  ProductType,
  UpdateProductBody
} from "./products.types"

const getAllProducts = async (): Promise<GetAllProductsResponse> => {

  try {
    const response = await authenticatedRequest({
      url: '/products',
      method: 'get'
    })

    const data: GetAllProductsResponse = response.data

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const createProduct = async (body: CreateProductBody): Promise<ProductType|null> => {
  try {
    const response = await authenticatedRequest({
      url: '/products',
      method: 'post',
      data: body
    })

    const data: ProductType = response.data

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const updateProduct = async (body: UpdateProductBody): Promise<ProductType|null> => {
  try {
    const response = await authenticatedRequest({
      url: '/products',
      method: 'put',
      data: body
    })

    const data: ProductType = response.data

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const deleteProduct = async (id: number): Promise<{ status: boolean }> => {
  try {
    const response = await authenticatedRequest({
      url: '/products',
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

export default { getAllProducts, createProduct, updateProduct, deleteProduct }