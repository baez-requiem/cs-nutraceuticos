import { useEffect, useCallback } from 'react'

const useWindowClick = (callback: (event: MouseEvent) => void) => {
  const handler = useCallback((event: MouseEvent) => {
    callback(event)
  }, [callback])

  useEffect(() => {
    window.addEventListener('click', handler)
    return () => {
      window.removeEventListener('click', handler)
    }
  }, [handler])
}


export default useWindowClick