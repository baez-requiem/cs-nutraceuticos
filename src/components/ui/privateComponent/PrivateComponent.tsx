import { Navigate } from "react-router-dom"

const PrivateComponent = ({ children }) => {
  const validation = true
  
  if (!validation) return Navigate({ to: '/login' })
  
  return children
}

export default PrivateComponent