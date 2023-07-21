import { AiOutlineEye } from "react-icons/ai"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { Header } from "src/components/template"
import { Badge, Flex, Grid, IconButton, Input, Paper, Private, Select, SideFilters, Table } from "src/components/ui"
import { useSales } from "./hooks/useSales"
import { ModalHistory, ModalLogisticInfos, ModalSale } from "./components"
import { matchColor } from "src/utils/theme"
import { BiHistory } from "react-icons/bi"
import RefreshDataButton from "src/components/context/refreshDataButton/RefreshDataButton"

export const Sales = () => {

  const {
    tableData,
    openModalSale,
    openModalLogisticInfos,
    openModalHistory,
    useModal,
    closeModal
  } = useSales()

  return (
    <Private roles={['Admin']} logout>
      <Grid gap={20}>
        <Header title="Vendas" subtitle="Logística" />

        <Paper>
          <Flex justify="end" gap={20}>
            <RefreshDataButton queries={['logistic/sales']} />

            <SideFilters>
              <Grid gap={10}>
                <Input label="Data" type="date" />
                <Input label="até" type="date" />
                <Select label="Status" />
                <Select label="Vendedor" />

                <Select label="Nome do cliente" />
                <Select label="Telefone" />
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
                  <IconButton color="sky_500" title="Visualizar" onClick={openModalSale(value.toString())}>
                    <AiOutlineEye color="white" size={20} />
                  </IconButton>
                  <IconButton color="blue_600" title="Editar" onClick={openModalLogisticInfos(value.toString())}>
                    <MdOutlineModeEditOutline color="white" size={20} />
                  </IconButton>
                  <IconButton color="gray_500" title="Histórico" onClick={openModalHistory(value.toString())}>
                    <BiHistory color="white" size={20} />
                  </IconButton>
                </Flex>
              ) },
            ]}
            data={tableData}
          />
        </Paper>
      </Grid>

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