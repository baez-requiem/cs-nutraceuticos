import axios from "axios"
import { API_URL } from "src/constants"

export const baseURL = API_URL

export const httpClient = axios.create({ baseURL })