import { Button, Divider, Flex, Paper, Private, SideFilters, Text } from "src/components/ui"

const Products = () => {

  return (
    <Private>
      <Text size="xl2" weight="600" color="gray_900">Produtos</Text>
      <Divider my={10} />

      <Paper>
        <Flex items="end" justify="space-between">
          <Button size="sm" color="green_600">Cadastrar</Button>

          <SideFilters>

          </SideFilters>
        </Flex>
      </Paper>

      <Divider my={10} />
      
      <Paper>

      </Paper>
    </Private>
  )
}

export default Products