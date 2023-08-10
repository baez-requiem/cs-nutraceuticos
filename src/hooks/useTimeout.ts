import { useEffect, useRef } from 'react'

const useTimeout = (callback: () => void, delay: number): void => {
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    timeoutRef.current = window.setTimeout(callback, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [callback, delay])
}

export default useTimeout