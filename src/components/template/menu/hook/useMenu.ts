import { useLocation, useNavigate } from "react-router-dom"

import { useMenuStore } from "src/stores"
import { useWindowSize } from 'src/hooks'

const useMenu = () => {
  const { show, close, open, subMenuOpen, toggleSubMenuOpen } = useMenuStore()
  
  const [width] = useWindowSize()
  const isMobile = width < 720

  const navigate = useNavigate()

  const navigateTo = (str: string) => () => {
    isMobile && close()

    navigate(str)
  }

  const { pathname } = useLocation()

  const inRoute = (str: string): boolean => pathname === str

  const toggleMenu = () => !show ? open() : close()

  return {
    inRoute,
    hasMenuHide: !show,
    navigateTo,
    toggleMenu,
    subMenuOpen,
    toggleSubMenuOpen
  }
}

export { useMenu }