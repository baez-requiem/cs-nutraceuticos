import { Divider, Flex, Paper, Text } from "src/components/ui"

import { BiDollar } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { TbMoodDollar } from 'react-icons/tb'

const MonthSalesByMedia = () => {

  return (
    <Paper>
      <Text size="xl" weight="600" color="gray_900">Vendas mensais por mídia(06/06)</Text>
      
      <Divider my={10} />
      
      <Flex justify="space-between" gap={20} style={{ overflowX: 'auto' }}>

        {Array(5).fill('').map(_ => (
          <Paper color="indigo_600" style={{ minWidth: '250px' }}>
            <Text weight="600" size="lg" color="white">Facebook</Text>

            <Divider />

            <Flex gap={5} items="center" justify="space-between">
              <Text size="sm" weight="600" color="gray_50">
                <TbMoodDollar size={20} />
              </Text>

              <Text size="sm" weight="600" color="gray_50">4</Text>
            </Flex>

            <Divider my={2.5} line opacityLine={.1} color="white" />

            <Flex gap={5} items="center" justify="space-between">
              <Text size="sm" weight="600" color="gray_50">
                <AiOutlineShoppingCart size={20} />
              </Text>

              <Text size="sm" weight="600" color="gray_50">21</Text>
            </Flex>

            <Divider my={2.5} line opacityLine={.1} color="white" />

            <Flex gap={5} items="center" justify="space-between">
              <Text size="sm" weight="600" color="gray_50">
                <BiDollar size={20} />
              </Text>

              <Text size="sm" weight="600" color="gray_50">R$ 903,56</Text>
            </Flex>
          </Paper>
        )) }
        
      
      </Flex>
    </Paper>
  )
}

export default MonthSalesByMedia