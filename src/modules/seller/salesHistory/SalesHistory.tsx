import { Badge, Divider, Flex, Grid, Input, Paper, Private, SideFilters, Table, TableActions, Text } from "src/components/ui"
import { useSalesHistory } from "./hooks/useSalesHistory"
import { SaleDetailsModal, SaleModal } from "src/components/modals"
import { matchColor } from "src/utils/theme"

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
            { label: "#", value: "number" },
            { label: "Cliente", value: "client_name" },
            { label: "Telefone", value: "client_phone" },
            { label: "Mídia", value: "media" },
            { label: "Data", value: "date" },
            { label: "Cód. rastreio", value: "tracking_code" },
            {
              label: 'Status', value: 'status', render: (value, obj) => (
                <Badge block color={matchColor(obj.color_status?.toString()) || 'black'}>{value}</Badge>
              )
            },
            { label: "Ações", value: "id", align: 'center', render: (value, sale) => <TableActions
              actions={[
                { type: 'Vizualizer', onClick: openModal('sale-details', value.toString()) },
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

      <SaleDetailsModal
        show={useModal.show === 'sale-details'}
        onClose={closeModal}
        data={useModal.data}
      />
    </Private>
  )
}

export default SalesHistory