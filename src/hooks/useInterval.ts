import { useEffect, useRef, useState } from 'react'

const useInterval = (callback: () => void, delay: number, initIsActive: boolean = true) => {
  const [isActive, setIsActive] = useState<boolean>(initIsActive)

  const savedCallback = useRef<() => void | null>(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)

      if (!isActive) return clearInterval(id)

      return () => clearInterval(id)
    }
  }, [delay, isActive])  

  const toggleInterval = () => setIsActive(!isActive)  

  return { isActive, toggleInterval }
}

export { useInterval }