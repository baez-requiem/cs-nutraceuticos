import { AiOutlineEye } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { Header } from "src/components/template"
import { Badge, Flex, Grid, IconButton, Input, Paper, Private, Select, SideFilters, Table } from "src/components/ui"
import { useSales } from "./hooks/useSales"
import { ModalSale } from "./components"
import { matchColor } from "src/utils/theme"

export const Sales = () => {

  const {
    tableData,
    openModalSale,
    useModal,
    closeModal
  } = useSales()

  return (
    <Private>
      <Grid gap={20}>
        <Header title="Vendas" subtitle="Logística" />

        <Paper>
          <Flex justify="end">
            <SideFilters>
              <Grid gap={10}>
                <Input label="Data" type="date" />
                <Input label="até" type="date" />
                <Select label="Status" />
                <Select label="Vendedor" />
              </Grid>
            </SideFilters>
          </Flex>
        </Paper>

        <Paper>
          <Table
            columns={[
              { label: 'Data', value: 'date' },
              { label: 'Vendedor', value: 'user_name' },
              { label: 'Qntd. total de vendas', value: 'total_sales' },
              { label: 'Qntd. total de produtos', value: 'total_products' },
              { label: 'Valor total', value: 'total_amount' },
              { label: 'Status', value: 'status', render: (value, data) => (
                <Badge color={matchColor(data.color_status?.toString()) || 'black'}>{value}</Badge>
              ) },
              { label: 'Ações', align: 'center', value: 'id', render: value => (
                <Flex justify="center" gap={10}>
                  <IconButton color="sky_500" title="Visualizar">
                    <AiOutlineEye color="white" size={20} />
                  </IconButton>
                  <IconButton color="blue_600" title="Editar" onClick={openModalSale(value.toString())}>
                    <MdOutlineModeEditOutline color="white" size={20} />
                  </IconButton>
                  <IconButton color="red_600" title="Excluir">
                    <BsTrash color="white" size={18} />
                  </IconButton>
                </Flex>
              ) },
            ]}
            data={tableData}
          />
        </Paper>
      </Grid>

      <ModalSale show={useModal.show == 'sale'} data={useModal.data!} onClose={closeModal} />
    </Private>
  )
}

export default Sales