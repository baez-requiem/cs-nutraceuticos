import { Divider, Paper, Text } from "src/components/ui"

const SalesSummary = () => {

  return (
    <Paper>
      <Text size="xl" weight="600" color="gray_900">Total de vendas</Text>
      <Divider my={10} />
      
      <Paper color="indigo_600">
        <Text size="lg" weight="500" color="white">Está mês:</Text>
        <Divider />
        <Text color="white" size="xl" weight="600" full align="right">1326</Text>
      </Paper>

      <Divider />
      
      <Paper color="indigo_500">
        <Text size="lg" weight="500" color="white">Está semana:</Text>
        <Divider />
        <Text color="white" size="xl" weight="600" full align="right">236</Text>
      </Paper>

      <Divider />

      <Paper color="blue_500">
        <Text size="lg" weight="500" color="white">Hoje:</Text>
        <Divider />
        <Text color="white" size="xl" weight="600" full align="right">32</Text>
      </Paper>

    </Paper>
  )
}

export default SalesSummary