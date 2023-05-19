import { Divider, Paper, Text } from "src/components/ui";

const DailyInvoicing = () => (
    <div>
        <Paper>
            <Text size="xl" weight="600" color="rgb(8, 47, 73)">Receita hoje(22/05)</Text>
            <Divider my={10} />
            <Text size="xl" weight="600" color="#166534">R$ 39.723,35</Text>
        </Paper>
    </div>
)

export default DailyInvoicing