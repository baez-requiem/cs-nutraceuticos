import { Header } from "src/components/template"
import { Badge, Checkbox, Divider, Flex, Grid, Input, Paper, Private, Select, SideFilters, Table, TableActions, Text } from "src/components/ui"
import { useSaleClosing } from "./hooks/useSaleClosing"
import { matchColor } from "src/utils/theme"
import { LogisticInfosHistoryModal, LogisticInfosModal, SaleModal } from "src/components/modals"
import { MotoboysResume, TotalsResume } from "./components"

export const SaleClosing = () => {

  const {
    tableData,
    usersOpts,
    deliveryTypesOpts,
    motoboysOpts,
    paymentTypesOpts,
    closeModal,
    openModal,
    useModal,
    sales,
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
              />
              
              <Select
                label="Método de pagamento"
                options={paymentTypesOpts}
                name="payment_type"
                value={values.payment_type}
                onChange={handleChange}
              />

              <Select
                label="Motoboy"
                options={motoboysOpts}
                name="motoboy"
                value={values.motoboy}
                onChange={handleChange}
              />

              <Select
                label="Vendedor"
                options={usersOpts}
                name="seller"
                value={values.seller}
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
            // { label: '', value: 'id', render: value => (
            //   <Checkbox
            //     onChange={toggleCheckData(value.toString())}
            //     checked={useCheckData.includes(value.toString())}
            //   />
            // ) },
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
            {
              label: 'Ações', align: 'center', value: 'id', render: value => (
                <TableActions actions={[
                  { type: 'Vizualizer', onClick: openModal('sale', value.toString()) },
                  { type: 'Edit', onClick: openModal('logistic-infos', value.toString()) },
                  { type: 'History', onClick: openModal('history', value.toString()) },
                ]} />
              )
            },
          ]}
          data={tableData}
        />
      </Paper>
      
      <Divider my={10} />

      <TotalsResume sales={sales} />

      <Divider my={10} />

      <MotoboysResume sales={sales} />

      <LogisticInfosModal
        show={useModal.show == 'logistic-infos'}
        data={useModal.data!}
        onClose={() => closeModal('sale')}
      />

      <LogisticInfosHistoryModal
        show={useModal.show == 'history'}
        data={useModal.data!}
        onClose={closeModal}
      />

      <SaleModal
        show={useModal.show == 'sale'}
        data={useModal.data!}
        onClose={() => closeModal('sale')}
      />
    </Private>
  )
}

export default SaleClosing