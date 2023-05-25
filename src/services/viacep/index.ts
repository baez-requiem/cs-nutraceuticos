import axios from "axios"
import { CEPType } from "./types"

export const consultCep = async (cep: string): Promise<CEPType|null> => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

    const data: CEPType = response?.data

    return data
    
  } catch (error) {
    return null
  }
}