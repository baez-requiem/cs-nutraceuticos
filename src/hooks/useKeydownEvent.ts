import { useEffect, useState } from 'react'

type KeydownEvent = KeyboardEvent | null

const useKeydownEvent = (): KeydownEvent => {
  const [keydownEvent, setKeydownEvent] = useState<KeydownEvent>(null)

  const handleKeydown = (event: KeyboardEvent) => setKeydownEvent(event)

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  return keydownEvent
}

export { useKeydownEvent }