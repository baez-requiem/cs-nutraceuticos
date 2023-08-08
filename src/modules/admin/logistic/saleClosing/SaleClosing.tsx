import { Header } from "src/components/template"
import { Badge, Checkbox, Divider, Flex, Grid, Input, Paper, Private, Select, SideFilters, Table, Text } from "src/components/ui"
import { useSaleClosing } from "./hooks/useSaleClosing"
import { matchColor } from "src/utils/theme"

export const SaleClosing = () => {

  const {
    tableData,
    usersOpts,
    deliveryTypesOpts,
    motoboysOpts,
    totalAmount,
    totalDeliveryValue,
    totalProducts,
    totalSales,
    checkAmount,
    checkDeliveryValue,
    checkProducts,
    checkSales,
    toggleCheckData,
    useCheckData,
    formik: {
      values,
      handleChange,
      handleSubmit
    }
  } = useSaleClosing()

  return (
    <Private roles={['admin']} logout>

      <Header title="Fechamentos" subtitle="Logística" />

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

      <Divider my={10} />

      <Paper>
        <Table
          columns={[
            { label: '', value: 'id', render: value => (
              <Checkbox
                onChange={toggleCheckData(value.toString())}
                checked={useCheckData.includes(value.toString())}
              />
            ) },
            { label: '#', value: 'number' },
            { label: 'Data', value: 'created_at' },

            { label: 'Cliente', value: 'client_name' },
            { label: 'Cidade', value: 'client_city' },
            { label: 'Estado', value: 'client_state' },
            { label: 'Telefone', value: 'client_phone' },

            { label: 'Tipo entrega', value: 'delivery_type' },
            { label: 'Motoboy', value: 'motoboy' },
            { label: 'Data de entrega', value: 'delivery_date' },
            { label: 'Valor entrega', value: 'delivery_value' },
            {
              label: 'Status', value: 'status', render: (value, data) => (
                <Badge block color={matchColor(data.color_status?.toString()) || 'black'}>{value}</Badge>
              )
            },

            { label: 'Valor venda', value: 'total_amount' },
            { label: 'Vendedor', value: 'seller_name' },
          ]}
          data={tableData}
        />
      </Paper>
      
      <Divider my={10} />

      <Paper>
        <Text weight="500">Resumo</Text>
        <Divider my={10} />
        <Flex gap={20} items="center">
          <Badge block color="indigo_600">Total vendas: {totalSales}</Badge>
          <Badge block color="indigo_600">Total produtos: {totalProducts}</Badge>
          <Badge block color="indigo_600">Total receita: R$ {totalAmount}</Badge>
          <Badge block color="indigo_600">Total valor entrega: R$ {totalDeliveryValue}</Badge>
        </Flex>
      </Paper>

      <Divider my={10} />

      <Paper>
        <Text weight="500">Resumo - Vendas selecionadas</Text>
        <Divider my={10} />
        <Flex gap={20} items="center">
          <Badge block color="cyan_600">Total vendas: {checkSales}</Badge>
          <Badge block color="cyan_600">Total produtos: {checkProducts}</Badge>
          <Badge block color="cyan_600">Total receita: R$ {checkAmount}</Badge>
          <Badge block color="cyan_600">Total valor entrega: R$ {checkDeliveryValue}</Badge>
        </Flex>
      </Paper>
    </Private>
  )
}

export default SaleClosing