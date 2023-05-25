import { BsTrash } from "react-icons/bs"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { Button, Divider, Flex, IconButton, Paper, Private, SideFilters, Table, Text } from "src/components/ui"
import Badge from "src/components/ui/badge/Badge"
import ModalSeller from "./ModalSeller"
import { consultCep } from "src/services/viacep"

const Sellers = () => {

  return (
    <Private>
      <Text size="xl2" weight="600" color="gray_900">Vendedores</Text>
      <Divider my={10} />
      
      <Paper>
        <Flex items="end" justify="space-between">
          <Button size="sm" color="green_600" onClick={async () => {
            console.log(await consultCep('88085250'))
          }}>Cadastrar</Button>

          <SideFilters>

          </SideFilters>
        </Flex>
      </Paper>

      <Divider my={10} />
    
      <Paper>
        <Table
          columns={[
            { label: 'ID', value: 'id' },
            { label: 'Nome', value: 'name' },
            { label: 'Telefone', value: 'phone' },
            { label: 'login', value: 'login' },
            { label: 'Data inicial', value: 'inital_date' },
            {
              label: 'status',
              value: 'status',
              render: value => value == 1 ? <Badge color="green_500">Ativo</Badge> : <Badge color="gray_600">Desativado</Badge>
            },
            { label: 'equipe', value: 'team' },
            // { label: 'Anotações', value: 'note' },
            {
              label: 'Ações',
              value: 'id',
              align: 'center',
              render: (value, data) => (
                <Flex justify="center" gap={10}>
                  <IconButton color="blue_600" onClick={() => {}}>
                    <MdOutlineModeEditOutline color="white" size={20} />
                  </IconButton>
                  <IconButton color="red_600" onClick={() => { }}>
                    <BsTrash color="white" size={18} />
                  </IconButton>
                </Flex>
              ),
            },
          ]}
          data={[
            { id: 1, name: 'Fulano de tal', phone: '(99) 99999-9999', login: 'fulano', inital_date: '09/09/2019', status: 1, team: 'Alfas' },
            { id: 2, name: 'Fulano de tal', phone: '(99) 99999-9999', login: 'fulano', inital_date: '09/09/2019', status: 1, team: 'Alfas' },
            { id: 3, name: 'Fulano de tal', phone: '(99) 99999-9999', login: 'fulano', inital_date: '09/09/2019', status: 0, team: 'Alfas' },
            { id: 4, name: 'Fulano de tal', phone: '(99) 99999-9999', login: 'fulano', inital_date: '09/09/2019', status: 1, team: 'Alfas' },
          ]}
        />
      </Paper>

      <ModalSeller show={false} onClose={() => {} } />
    </Private>
  )
}

export default Sellers