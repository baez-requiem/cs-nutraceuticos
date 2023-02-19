import { useState, useEffect } from 'react'

const useWindowSize = (): [number, number] => {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleResize = (): void => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    
    return (): void => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return [width, height]
}

export default useWindowSize
