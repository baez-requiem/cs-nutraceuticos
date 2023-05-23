import { Divider, Flex, Paper, SideFilters, Text } from "src/components/ui"

const Products = () => {

  return (
    <>
      <Text size="xl2" weight="600" color="gray_900">Produtos</Text>
      <Divider my={10} />

      <Paper>
        <Flex items="end" justify="space-between">
          <Text>teste</Text>

          <SideFilters show>

          </SideFilters>
        </Flex>
      </Paper>

      <Divider my={10} />
      
      <Paper>

      </Paper>
    </>
  )
}

export default Products