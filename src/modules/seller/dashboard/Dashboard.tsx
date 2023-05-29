import { Button, Divider, Flex, Paper, Private, Text } from "src/components/ui"

const Dashboard = () => {

  return (
    <Private>
      <Text size="xl2" weight="600" color="gray_900">Dashboard</Text>
      <Divider my={10} />
      <Paper>
        <Flex gap={10} items="end" justify="end">
          <Button color="green_600">Nova venda</Button>
        </Flex>
      </Paper>
    </Private>
  )
}

export default Dashboard