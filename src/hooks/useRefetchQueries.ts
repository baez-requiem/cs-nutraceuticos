import { useQueryClient } from "react-query"

const useRefetchQueries = () => {

  const queryClient = useQueryClient()

  const refetchQueries = (queries: unknown[]) => {
    queries.map(query => {
      queryClient.refetchQueries(query)
    })
  }

  return {
    refetchQueries
  }
}

export default useRefetchQueries