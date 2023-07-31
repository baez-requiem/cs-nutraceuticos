import { Divider, Flex, Grid, Input, Paper, Private, SideFilters, Table, TableActions, Text } from "src/components/ui"
import { useSalesHistory } from "./hooks/useSalesHistory"
import { SaleModal } from "src/components/modals"

const SalesHistory = () => {

  const {
    tableData,
    closeModal,
    openModal,
    useModal,
    formik: {
      values,
      handleSubmit,
      handleChange
    }
  } = useSalesHistory()

  return (
    <Private roles={['seller']} logout>
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
            { label: "Ações", value: "id", align: 'center', render: (value, sale) => <TableActions
              actions={[
                { type: 'Vizualizer', onClick: () => {} },
                { type: 'Edit', onClick: openModal('sale', value.toString()), show: !!sale.hasEditSale },
              ]}
            /> },
          ]}
          data={tableData}
        />
      </Paper>

      <SaleModal
        show={useModal.show === 'sale'}
        onClose={closeModal}
        data={useModal.data}
      />
    </Private>
  )
}

export default SalesHistory