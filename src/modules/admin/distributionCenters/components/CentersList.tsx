import { Badge, Divider, Flex, Grid, Paper, Text } from "src/components/ui"

const CentersList = () => {

  return (
    <Paper>
      <Flex gap={20}>
        <Paper style={{ width: 300 }}>
          <Grid gap={10}>
            <Text size="lg" weight="500">Matriz</Text>

            <Divider line opacityLine={0.15} />

            <Badge color="green_500">
              <Flex gap={20} justify="space-between">
                <Text size="sm" color="white" weight="500">Matriz</Text>
                <Text size="sm" color="white">7</Text>
              </Flex>
            </Badge>
            <Badge color="green_500">
              <Flex gap={20} justify="space-between">
                <Text size="sm" color="white" weight="500">Matriz</Text>
                <Text size="sm" color="white">7</Text>
              </Flex>
            </Badge>
            <Badge color="green_500">
              <Flex gap={20} justify="space-between">
                <Text size="sm" color="white" weight="500">Matriz</Text>
                <Text size="sm" color="white">7</Text>
              </Flex>
            </Badge>
          </Grid>
        </Paper>
        <Paper style={{ width: 300 }}>
          <Text weight="500">Matriz</Text>
        </Paper>
        <Paper style={{ width: 300 }}>
          <Text weight="500">Matriz</Text>
        </Paper>
      </Flex>
    </Paper>
  )
}

export { CentersList }