import { AiOutlineEye } from "react-icons/ai"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { Header } from "src/components/template"
import { Badge, Divider, Flex, Grid, IconButton, Input, Paper, Private, Select, SideFilters, Table, TableActions } from "src/components/ui"
import { useSales } from "./hooks/useSales"
import { ModalHistory, ModalLogisticInfos, ModalSale } from "./components"
import { matchColor } from "src/utils/theme"

import { handleChangeFormatPhone } from "src/utils/form.utils"


export const Sales = () => {

  const {
    tableData,
    statusOpts,
    usersOpts,
    openModalSale,
    openModalLogisticInfos,
    openModalHistory,
    useModal,
    closeModal,
    salePDF,
    formik: {
      values,
      handleChange,
      submitForm,
      setFieldValue
    }
  } = useSales()

  return (
    <Private roles={['admin']} logout>

      <Header title="Vendas" subtitle="Logística" />

      <Divider my={10} />

      <Paper>
        <Flex justify="end" gap={20}>
          <SideFilters onFilter={submitForm}>
            <Grid gap={10}>
              <Input
                name="init_date"
                label="Data"
                type="date"
                onChange={handleChange}
                value={values.init_date}
              />
              <Input
                name="end_date"
                label="até"
                type="date"
                onChange={handleChange}
                value={values.end_date}
              />

              <Select
                label="Status"
                name="status"
                onChange={handleChange}
                value={values.status}
                options={statusOpts}
                nullable
              />
              <Select
                label="Vendedor"
                name="seller"
                onChange={handleChange}
                value={values.seller}
                options={usersOpts}
                nullable
              />

              <Input
                label="Nome do cliente"
                name="client_name"
                onChange={handleChange}
                value={values.client_name}
              />
              <Input
                label="Telefone"
                name="client_phone"
                onChange={handleChangeFormatPhone(setFieldValue)}
                value={values.client_phone}
              />
            </Grid>
          </SideFilters>
        </Flex>
      </Paper>

      <Divider my={10} />

      <Paper>
        <Table
          columns={[
            { label: 'Data', value: 'date' },
            { label: 'Vendedor', value: 'user_name' },
            { label: 'Qntd. vendas', value: 'total_sales' },
            { label: 'Qntd. produtos', value: 'total_products' },
            { label: 'Valor total', value: 'total_amount' },
            {
              label: 'Status', value: 'status', render: (value, data) => (
                <Badge block color={matchColor(data.color_status?.toString()) || 'black'}>{value}</Badge>
              )
            },
            {
              label: 'Ações', align: 'center', value: 'id', render: (value, data) => (
                <TableActions actions={[
                  { type: 'Vizualizer', onClick: openModalSale(value.toString()) },
                  { type: 'Edit', onClick: openModalLogisticInfos(value.toString()) },
                  { type: 'History', onClick: openModalHistory(value.toString()) },
                  { type: 'PDF', onClick: salePDF(value.toString()), show: !!data.showPdf },
                ]} />
              )
            },
          ]}
          data={tableData}
        />
      </Paper>


      <ModalSale
        show={useModal.show == 'sale'}
        data={useModal.data!}
        onClose={closeModal}
      />

      <ModalLogisticInfos
        show={useModal.show == 'logistic-infos'}
        data={useModal.data!}
        onClose={closeModal}
      />

      <ModalHistory
        show={useModal.show == 'history'}
        data={useModal.data!}
        onClose={closeModal}
      />
    </Private>
  )
}

export default Sales