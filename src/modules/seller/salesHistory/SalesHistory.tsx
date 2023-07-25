import { Button, Divider, Flex, Grid, Input, Paper, Private, SideFilters, Table, Text } from "src/components/ui"
import { useSalesHistory } from "./hooks/useSalesHistory"

const SalesHistory = () => {

  const {
    tableData,
    formik: {
      values,
      handleSubmit,
      handleChange
    }
  } = useSalesHistory()

  return (
    <Private roles={['Vendedor']} logout>
      <Text size="xl2" weight="600" color="gray_900">Histórico de vendas</Text>
      <Divider my={10} />

      <Paper>
          <Flex justify="end" gap={20}>
            <SideFilters onFilter={handleSubmit}>
              <Grid gap={10}>
                <Input
                  label="Data"
                  type="date"
                  name="init_date"
                  value={values.init_date}
                  onChange={handleChange}
                />

                <Input
                  label="até"
                  type="date"
                  name="end_date"
                  value={values.end_date}
                  onChange={handleChange}
                />
              </Grid>
            </SideFilters>
          </Flex>

        </Paper>
      
      <Divider my={10} />

      <Paper>
        <Table
          columns={[
            { label: "Cliente", value: "client_name" },
            { label: "Telefone", value: "client_phone" },
            { label: "Mídia", value: "media" },
            { label: "Qntd. Vendas", value: "sales_quantity" },
            { label: "Data", value: "date" },
            { label: "Ações", value: "id" },
          ]}
          data={tableData}
        />
      </Paper>

      <Divider my={10} />
    </Private>
  )
}

export default SalesHistory