import { Header } from "src/components/template"
import { Flex, Grid, Input, Paper, Private, Select, SideFilters, Table } from "src/components/ui"
import { useSaleClosing } from "./hooks/useSaleClosing"

export const SaleClosing = () => {

  const {
    tableData,
    usersOpts,
    deliveryTypesOpts,
    motoboysOpts,
    formik: {
      values,
      handleChange,
      handleSubmit
    }
  } = useSaleClosing()

  return (
    <Private roles={['admin']} logout>
      <Grid gap={20}>
        <Header title="Fechamentos" subtitle="Logística" />

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

                <Select
                  label="Tipo de entrega"
                  options={deliveryTypesOpts}
                  name="delivery_type"
                  value={values.delivery_type}
                  onChange={handleChange}
                  nullable
                />

                <Select
                  label="Motoboy"
                  options={motoboysOpts}
                  name="motoboy"
                  value={values.motoboy}
                  onChange={handleChange}
                  nullable
                />

                <Select
                  label="Vendedor"
                  options={usersOpts}
                  name="seller"
                  value={values.seller}
                  onChange={handleChange}
                  nullable
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