import { AiOutlineEye } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { Header } from "src/components/template"
import { Flex, Grid, IconButton, Input, Paper, Private, Select, SideFilters, Table } from "src/components/ui"

export const Sales = () => {

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
              { label: 'Data', value: 'idx' },
              { label: 'Vendedor', value: 'idx' },
              { label: 'Qntd. total de vendas', value: 'idx' },
              { label: 'Qntd. total de produtos', value: 'idx' },
              { label: 'Valor total', value: 'idx' },
              { label: 'Status', value: 'idx' },
              { label: 'Ações', align: 'center', value: 'idx', render: value => (
                <Flex justify="center" gap={10}>
                  <IconButton color="sky_500" title="Visualizar">
                    <AiOutlineEye color="white" size={20} />
                  </IconButton>
                  <IconButton color="blue_600" title="Editar">
                    <MdOutlineModeEditOutline color="white" size={20} />
                  </IconButton>
                  <IconButton color="red_600" title="Excluir">
                    <BsTrash color="white" size={18} />
                  </IconButton>
                </Flex>
              ) },
            ]}
            data={[{},{},{},{},{}]}
          />
        </Paper>
      </Grid>
    </Private>
  )
}

export default Sales