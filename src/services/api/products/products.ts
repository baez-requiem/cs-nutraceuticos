import { authenticatedRequest } from "../utils"

const getAllProducts = async () => {

  try {
    const response = await authenticatedRequest({
      url: '/products',
      method: 'get'
    })

    // Manipular a resposta
    console.log('Resposta:', response.data);
  } catch (error) {
  
  }
}

export default { getAllProducts }