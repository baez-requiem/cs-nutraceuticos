import { FC } from 'react'

import { useQueryClient } from "react-query"
import { IconButton } from "src/components/ui"
import { StyledLoader } from './styles'
import { useInterval } from 'src/hooks'

import { TbClockPlay } from "react-icons/tb"

interface RefreshQueriesButtonProps {
  queries?: any[]
  delay: number
}

const RefreshQueriesButton: FC<RefreshQueriesButtonProps> = ({ queries, delay }) => {
  const queryClient = useQueryClient()

  const { isActive, toggleInterval } = useInterval(() => {
    queries?.forEach(query => {
      const key = Array.isArray(query) ? query : [query]

      queryClient.refetchQueries(key)
    })
  }, delay, false)

  return (
    <IconButton color="blue_500" title={`${isActive ? 'Desativar' : 'Ativar'} atualização automática`} onClick={toggleInterval}>
      {isActive
        ? <StyledLoader ms={delay} />
        : <TbClockPlay color='white' size={18} />}      
    </IconButton>
  )
}

export default RefreshQueriesButton