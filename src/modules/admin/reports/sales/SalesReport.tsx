import { BsChevronDoubleRight } from "react-icons/bs"
import { Divider, Flex, Paper, Private, SideFilters, Table, Text } from "src/components/ui"

const SalesReport = () => {

  return (
    <Private>
      <Flex gap={10} items="center">
        <Text size="lg" weight="400" color="gray_900">Relatórios</Text>

        <BsChevronDoubleRight size={10} />

        <Text weight="600" size="xl2">Vendas</Text>
      </Flex>
      
      <Divider my={10} />

      <Paper>
        <Flex items="end" justify="end">
          <SideFilters>

          </SideFilters>
        </Flex>
      </Paper>

      <Divider my={10} />

      <Paper>
        <Table
          columns={[
            { label: 'Data', value: 'created_at' },
            { label: 'Cliente', value: 'name' },
            { label: 'Qntd. Vendas', value: 'qntd', render: value => <Text full align="right">{value}</Text> },
            { label: 'Desconto', value: 'disconts', render: value => <Text full align="right">{value}</Text> },
            { label: 'Valor', value: 'amount', render: value => <Text full align="right">{value}</Text> },
            { label: 'Ações', value: 'id' },
          ]}
          data={[
            { created_at: '00:00:00 01/01/2023', name: 'Joãozinho da silva', qntd: 421, disconts: 'R$ 10,22', amount: 'R$ 4.565,68' }
          ]}
        />
      </Paper>
    </Private>
  )
}

export default SalesReport