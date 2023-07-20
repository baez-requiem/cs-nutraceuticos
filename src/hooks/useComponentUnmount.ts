import { useEffect } from 'react'

const useComponentUnmount = (fn: () => void) => {
  useEffect(() => () => fn(), [])
}

export default useComponentUnmount