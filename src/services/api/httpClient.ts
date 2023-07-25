import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

export const baseURL = apiUrl

export const httpClient = axios.create({ baseURL })