import { Navigate } from "react-router-dom"
import { getStorageAuth } from "src/utils/localstorage"

const PrivateComponent = ({ children }) => {
  const auth = getStorageAuth()

  const validation = !!auth?.token
  
  if (!validation) return Navigate({ to: '/login' })
  
  return children
}

export default PrivateComponent