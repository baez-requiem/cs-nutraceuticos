import { useWindowSize } from "src/hooks"
import { useMenuStore } from "src/stores"

const useHeader = () => {
  const [width] = useWindowSize()
  const { open: openMenu } = useMenuStore()

  const isMobile = width < 720

  return {
    openMenu,
    isMobile
  }
}

export { useHeader }