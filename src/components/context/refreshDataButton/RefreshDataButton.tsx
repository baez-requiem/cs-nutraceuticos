import { FC } from 'react'

import { FiRefreshCcw } from "react-icons/fi"
import { useQueryClient } from "react-query"
import { IconButton } from "src/components/ui"

interface RefreshDataButtonProps {
  queries?: string[]
}

const RefreshDataButton: FC<RefreshDataButtonProps> = ({ queries }) => {

  const queryClient = useQueryClient()

  const refresh = () => {
    queries.forEach(query => {
      queryClient.refetchQueries([query])
    })
  }

  return (
    <IconButton color="green_600" title="Atualizar dados" onClick={refresh}>
      <FiRefreshCcw color="white" />
    </IconButton>
  )
}

export default RefreshDataButton