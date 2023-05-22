import { Divider, Flex, IconBadge, Paper, Text } from "src/components/ui"

import { BiDollar } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { TbMoodDollar } from 'react-icons/tb'

const Statistics = () => {

  return (
    <Paper>
      <Text size="xl" weight="600" color="gray_900">Estatísticas mensal(06/2023)</Text>
      
      <Divider my={10} />
      
      <Flex justify="space-between">
        
        <Flex gap={10} items="center">
          <IconBadge color="indigo_500" size={50}>
            <TbMoodDollar size={28} color="white" />
          </IconBadge>
          <Flex direction="column" gap={5}>
            <Text size="lg" weight="600" color="gray_700">6848</Text>
            <Text weight="600" color="gray_700">Vendas</Text>
          </Flex>
        </Flex>
        
        <Flex gap={10} items="center">
          <IconBadge color="sky_500" size={50}>
            <AiOutlineShoppingCart size={28} color="white" />
          </IconBadge>
          <Flex direction="column" gap={5}>
            <Text size="lg" weight="600" color="gray_700">10983</Text>
            <Text weight="600" color="gray_700">Produtos</Text>
          </Flex>
        </Flex>
        
        <Flex gap={10} items="center">
          <IconBadge color="green_600" size={50}>
            <BiDollar size={28} color="white" />
          </IconBadge>
          <Flex direction="column" gap={5}>
            <Text size="lg" weight="600" color="gray_700">R$ 192.456,32</Text>
            <Text weight="600" color="gray_700">Receita</Text>
          </Flex>
        </Flex>
        
      </Flex>
    </Paper>
  )
}

export default Statistics