import { Button, Divider, Flex, Grid, Input, Paper, Private, Table, Text } from "src/components/ui"

const SalesHistory = () => {

  return (
    <Private>
      <Text size="xl2" weight="600" color="gray_900">Histórico de vendas</Text>
      <Divider my={10} />

      <Grid template="300px">
        <Input label="Pesquisar..." />
      </Grid>

      
      <Divider my={10} />

      <Paper>
        <Table
          columns={[
            { label: "Cliente", value: "client_name" },
            { label: "Telefone", value: "phone" },
            { label: "Mídia", value: "media" },
            { label: "Qntd. Vendas", value: "quantity_sales" },
            { label: "Data", value: "date" },
            { label: "Ações", value: "id" },
          ]}
          data={[
            { id: 'a1', client_name: 'Fulano de tal', phone: '(99) 99999-9999', media: "Facebook", quantity_sales: 16, date: '01/01/2023 ás 10:00' },
            { id: 'a2', client_name: 'Fulano de tal', phone: '(99) 99999-9999', media: "Google Ads", quantity_sales: 16, date: '01/01/2023 ás 09:00' },
            { id: 'a3', client_name: 'Fulano de tal', phone: '(99) 99999-9999', media: "WhatsApp", quantity_sales: 16, date: '01/01/2023 ás 08:00' }
          ]}
        />
      </Paper>

      <Divider my={10} />
    </Private>
  )
}

export default SalesHistory