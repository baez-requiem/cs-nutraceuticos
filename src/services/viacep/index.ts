import axios from "axios"
import { CEPType } from "./types"
import { onlyNumbers } from "src/utils/number.utils"

export const consultCep = async (cep: string): Promise<CEPType|null> => {

  const parseCEP = onlyNumbers(cep)
  const isValid = parseCEP.length === 8

  if (!isValid) {
    return null
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

    const data: CEPType = response?.data

    return data
    
  } catch (error) {
    return null
  }
}