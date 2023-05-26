import { Divider, Flex, Paper, Text } from "src/components/ui"

const SaleInfo = () => (
  <div>
    <Flex justify="space-between">
      <Text weight="700" color="gray_600">Fulano de tal</Text>
      <Text size="lg" weight="600" color="green_600">+ R$ 235,35</Text>
    </Flex>

    <Divider />
    
    <Flex direction="column">
      <Flex justify="space-between">
        <Text size="sm">5x</Text>
        <Text size="sm">BEAUTY CAPS</Text>  
      </Flex>
      <Flex justify="space-between">
        <Text size="sm">2x</Text>
        <Text size="sm">VIGRA CPS</Text>  
      </Flex>
      <Flex justify="space-between">
        <Text size="sm">1x</Text>
        <Text size="sm">VIGRA GEL</Text>  
      </Flex>
    </Flex>

    <Divider my={10} line opacityLine={0.15} />
  </div>
)

const LastSales = () => {

  return (
    <Paper>
      <Text size="xl" weight="600" color="gray_900">Últimas vendas</Text>
      <Divider my={10} />

      <div>
        <SaleInfo />
        <SaleInfo />
        <SaleInfo />
        <SaleInfo />
      </div>
    </Paper>
  )
}

export default LastSales