import { useQuery } from "react-query"
import { logisticApi } from "src/services/api"

const useMotoboys = () => {

  const { data: motoboys } = useQuery('logistic/sales', logisticApi.getMotoboys, { initialData: [], refetchOnWindowFocus: false })

  const tableData = motoboys.map(motoboy => ({
    id: motoboy.id,
    name: motoboy.name,
    status: 0
  }))

  return {
    tableData
  }
}

export { useMotoboys }