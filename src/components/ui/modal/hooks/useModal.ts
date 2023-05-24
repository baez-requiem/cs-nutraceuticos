import { useEffect, useState } from 'react'

const useModal = (show:boolean) => {
  const [useShow, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => { setShow(show) }, 366)
    
    return () => clearTimeout(timer)
  }, [show])

  const hasShow = show ? true : (useShow || show)

  return { hasShow }
}

export { useModal }