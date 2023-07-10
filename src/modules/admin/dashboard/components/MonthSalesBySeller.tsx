import { Divider, Flex, IconBadge, Paper, Text } from "src/components/ui"

import { BiDollar } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { TbMoodDollar } from 'react-icons/tb'
import { useQuery } from "react-query"
import { dashboardApi } from "src/services/api"
import { floatToReal } from "src/utils/number.utils"

const MonthSalesBySeller = () => {

  const { data: monthSalesBySeller } = useQuery(
    'dashboard/month-sales-by-seller',
    dashboardApi.getMonthSalesBySeller,
    { refetchInterval: 10000, initialData: [] }
  )

  return (
    <Paper>
      <Text size="xl" weight="600" color="gray_900">Vendas mensais por vendedor(06/2023)</Text>
      
      <Divider my={10} />
      
      <Flex gap={20} style={{ overflowX: 'auto' }}>

        {monthSalesBySeller.map(sale => (
          <Paper key={`month-sales-by-seller-${sale.id}`} color="sky_700" style={{ minWidth: '250px' }}>
            <Text weight="600" size="lg" color="white">{sale.name}</Text>

            <Divider />

            <Flex gap={5} items="center" justify="space-between">
              <Text size="sm" weight="600" color="gray_50">
                <TbMoodDollar size={20} />
              </Text>

              <Text size="sm" weight="600" color="gray_50">{sale.totalSales}</Text>
            </Flex>

            <Divider my={2.5} line opacityLine={.1} color="white" />

            <Flex gap={5} items="center" justify="space-between">
              <Text size="sm" weight="600" color="gray_50">
                <AiOutlineShoppingCart size={20} />
              </Text>

              <Text size="sm" weight="600" color="gray_50">{sale.totalProducts}</Text>
            </Flex>

            <Divider my={2.5} line opacityLine={.1} color="white" />

            <Flex gap={5} items="center" justify="space-between">
              <Text size="sm" weight="600" color="gray_50">
                <BiDollar size={20} />
              </Text>

              <Text size="sm" weight="600" color="gray_50">R$ {floatToReal(sale.totalAmount)}</Text>
            </Flex>
          </Paper>
        )) }
      </Flex>
    </Paper>
  )
}

export default MonthSalesBySeller