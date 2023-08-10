import { useEffect, useState } from 'react'
import { useKeydownEvent } from 'src/hooks'

const useModal = (show:boolean, onClose: (arg0?:any) => any) => {
  const [useShow, setShow] = useState(false)

  const keydownEvent = useKeydownEvent()

  useEffect(() => {
    const timer = setTimeout(() => { setShow(show) }, 366)
    
    return () => clearTimeout(timer)
  }, [show])

  useEffect(() => {
    if (keydownEvent && keydownEvent.key === "Escape") {
      onClose()
    }
  }, [keydownEvent])

  const hasShow = show ? true : (useShow || show)

  return { hasShow }
}

export { useModal }