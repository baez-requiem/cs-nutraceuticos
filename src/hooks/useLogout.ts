import { useNavigate } from 'react-router-dom'

const useLogout = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('auth')

    navigate('/login')
  }

  return { logout }
}

export default useLogout
