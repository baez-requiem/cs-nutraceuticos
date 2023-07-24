import { Header } from "src/components/template"
import { Flex, Grid, Input, Paper, Private, Select, SideFilters, Table } from "src/components/ui"
import { useSaleClosing } from "./hooks/useSaleClosing"

export const SaleClosing = () => {

  const { tableData } = useSaleClosing()

  return (
    <Private roles={['Admin']} logout>
      <Grid gap={20}>
        <Header title="Fechamentos" subtitle="Logística" />

        <Paper>
          <Flex justify="end" gap={20}>
            <SideFilters>
              <Grid gap={10}>
                <Input
                  label="Data"
                  type="date"
                />

                <Input
                  label="até"
                  type="date"
                />

                <Select
                  label="Tipo de entrega"
                />

                <Select
                  label="Motoboy"
                />

                <Select
                  label="Vendedor"
                />
              </Grid>
            </SideFilters>
          </Flex>

        </Paper>

        <Paper>
          <Table
            columns={[
              { label: 'Data', value: 'created_at' },

              { label: 'Cliente', value: 'client_name' },
              { label: 'Cidade', value: 'client_city' },
              { label: 'Estado', value: 'client_state' },
              { label: 'Telefone', value: 'client_phone' },

              { label: 'Tipo entrega', value: 'delivery_type' },
              { label: 'Motoboy', value: 'motoboy' },
              { label: 'Data de entrega', value: 'delivery_date' },
              { label: 'Valor entrega', value: 'delivery_value' },

              // { label: 'Qntd. vendas', value: 'total_sales' },
              // { label: 'Qntd. produtos', value: 'total_products' },
              { label: 'Valor venda', value: 'total_amount' },
              { label: 'Vendedor', value: 'seller_name' },
            ]}
            data={tableData}
          />
        </Paper>
      </Grid>
    </Private>
  )
}

export default SaleClosing