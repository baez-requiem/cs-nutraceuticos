import { Divider, Flex, Paper, Text } from "src/components/ui";

const DailyInvoicing = () => (
    <div>
        <Paper>
            <Text size="xl" weight="600" color="gray_900">Receita hoje(22/05)</Text>
            <Divider my={10} />
            <Text size="xl" weight="600" color="green_500">R$ 39.723,35</Text>
            
            
            <Divider my={10} />

            <Paper color="green_500">
              <Flex gap={20} justify="space-between">
                <Text size="xl" weight="600" color="white">+</Text>
                <Text size="xl" weight="600" color="white">R$ 39.723,35</Text>
              </Flex>
            </Paper>   
            <Divider my={10} />

            <Paper color="green_500">
              <Flex gap={20} justify="space-between">
                <Text size="xl" weight="600" color="white">+</Text>
                <Text size="xl" weight="600" color="white">R$ 39.723,35</Text>
              </Flex>
            </Paper>   
            <Divider my={10} />

            <Paper color="green_500">
              <Flex gap={20} justify="space-between">
                <Text size="xl" weight="600" color="white">+</Text>
                <Text size="xl" weight="600" color="white">R$ 39.723,35</Text>
              </Flex>
            </Paper>   
            <Divider my={10} />

            <Paper color="green_500">
              <Flex gap={20} justify="space-between">
                <Text size="xl" weight="600" color="white">+</Text>
                <Text size="xl" weight="600" color="white">R$ 39.723,35</Text>
              </Flex>
            </Paper>   
        </Paper>
    </div>
)

export default DailyInvoicing