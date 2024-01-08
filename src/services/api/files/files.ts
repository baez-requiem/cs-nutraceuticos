import { authenticatedRequest } from "../utils"

const pdfToImage = async ({ blob, imageName }: { blob: Blob, imageName: string }): Promise<Blob|null> => {
  const formData = new FormData()

  formData.append('pdf', blob, 'document.pdf')
  formData.append('imageName', imageName)

  try {
    const response = await authenticatedRequest({
      url: '/files/pdf-to-image',
      method: 'post',
      data: formData,
      responseType: 'blob'
    })

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}


export default {
  pdfToImage
}