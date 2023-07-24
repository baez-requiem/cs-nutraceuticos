import { useQuery } from "react-query"
import { logisticApi } from "src/services/api"
import { formatDate, formatDateTime } from "src/utils/date.utils"
import { floatToReal } from "src/utils/number.utils"

const useSaleClosing = () => {

  const { data: sales } = useQuery(
    'logistic/sales2e',
    async () => logisticApi.getSales(),
    { initialData: [], refetchOnWindowFocus: false }
  )

  console.log(sales)

  const tableData = sales.map(sale => {

    const logisticInfos = sale.logistic_infos[0]

    return {
      id: sale.id,
      created_at: formatDateTime(new Date(sale.created_at).toUTCString()),
  
      client_name: sale.name,
      client_city: sale.city,
      client_state: sale.state,
      client_phone: sale.phone,
  
      delivery_date: formatDate(logisticInfos.delivery_date),
      delivery_type: logisticInfos.delivery_type?.name,
      delivery_value: floatToReal(logisticInfos.delivery_value),
      motoboy: logisticInfos?.motoboy?.name || '',
  
      total_amount: floatToReal(sale.sale_products.reduce((pv, cv) => pv + (cv.product.amount * cv.quantity), 0) - sale.discounts),
  
      seller_name: sale.user.name,
    }
  })

  return {
    tableData
  }
}

export { useSaleClosing }