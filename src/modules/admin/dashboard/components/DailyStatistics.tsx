import { Divider, Flex, Grid, IconBadge, Paper, Text } from "src/components/ui"

import { BiDollar } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { TbMoodDollar } from 'react-icons/tb'

const Statistics = () => {

  return (
    <Paper>
      <Text size="xl" weight="600" color="gray_900">Estatísticas hoje({new Date().getDate()}/06)</Text>
      
      <Divider my={10} />
      
      <Grid template="1fr 1fr 1fr" xs="1fr" gap={20}>
        
        <Flex gap={10} items="center">
          <IconBadge color="indigo_400" size={50}>
            <TbMoodDollar size={28} color="white" />
          </IconBadge>
          <Flex direction="column" gap={5}>
            <Text size="lg" weight="600" color="gray_700">196</Text>
            <Text weight="600" color="gray_700">Vendas</Text>
          </Flex>
        </Flex>
        
        <Flex gap={10} items="center">
          <IconBadge color="sky_400" size={50}>
            <AiOutlineShoppingCart size={28} color="white" />
          </IconBadge>
          <Flex direction="column" gap={5}>
            <Text size="lg" weight="600" color="gray_700">983</Text>
            <Text weight="600" color="gray_700">Produtos</Text>
          </Flex>
        </Flex>
        
        <Flex gap={10} items="center">
          <IconBadge color="green_500" size={50}>
            <BiDollar size={28} color="white" />
          </IconBadge>
          <Flex direction="column" gap={5}>
            <Text size="lg" weight="600" color="gray_700">R$ 32.456,32</Text>
            <Text weight="600" color="gray_700">Receita</Text>
          </Flex>
        </Flex>
        
      </Grid>
    </Paper>
  )
}

export default Statistics