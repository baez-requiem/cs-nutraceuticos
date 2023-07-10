import { FC } from 'react'

import { Divider, Flex, Paper, Text } from "src/components/ui"
import { LastSaleType } from "src/services/api/dashboard/dashboard.types"
import { formatUTCDateTime } from 'src/utils/date.utils'
import { floatToReal } from 'src/utils/number.utils'

interface LastSalesProps {
  sales: LastSaleType[]
}

const LastSales: FC<LastSalesProps> = ({ sales = [] }) => {

  return (
    <Paper>
      <Text size="xl" weight="600" color="gray_900">Últimas vendas</Text>
      <Divider my={10} />

      <div style={{ maxHeight: 340, overflowY: 'auto' }}>
        {sales.map(sale => (
          <div key={`last-sale-${sale.id}`}>
            <Flex justify="space-between">
              <Text weight="700" color="gray_600">{sale.seller.name}</Text>
              <Text size="lg" weight="600" color="green_600">+ R$ {floatToReal(sale.total - sale.discounts)}</Text>
            </Flex>

            <Divider />

            <Flex direction="column">
              {sale.products.map(sp => (
                <Flex key={`last-sale-${sale.id}-${sp.name}`} justify="space-between">
                  <Text size="sm">{sp.quantity}x</Text>
                  <Text size="sm">{sp.name}</Text>  
                </Flex>
              ))}
            </Flex>

            <Divider />

            <Text size="xs" color="gray_500">{formatUTCDateTime(sale.created_at)}</Text>  

            <Divider my={10} line opacityLine={0.15} />
          </div>
        ))}
      </div>
    </Paper>
  )
}

export default LastSales