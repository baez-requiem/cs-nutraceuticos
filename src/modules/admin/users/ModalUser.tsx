import { FC } from "react"
import { Divider, Grid, Modal, Text, Input, Textarea, Flex, Button, Select, Switch } from "src/components/ui"
import { useModalUser } from "./hooks/useModalUser"
import { UserType } from "src/services/api/users/users.types"
import { handleChangeFormatCPF, handleChangeFormatPhone } from "src/utils/form.utils"

export interface ModalUserProps {
  show: boolean
  data?: UserType
  onClose: (arg0?: boolean) => void
}

const ModalUser: FC<ModalUserProps> = ({
  show,
  data,
  onClose
}) => {

  const titleText = !data?.id ? 'Cadastrar vendedor' : `Editar vendedor - ${data?.name || 'Fulano de tal'}`

  const {
    roles,
    salesTeam,
    searchCEP,
    formik: {
      values,
      handleChange,
      setFieldValue,
      submitForm,
    }
  } = useModalUser(show, onClose, data)

  return (
    <Modal show={show} onClose={onClose} maxWidth={600}>
      <Text size="xl" weight="600">{titleText}</Text>

      <Divider my={10} />

      <Text weight="500">Dados principais</Text>
      <Divider />
      <Grid gap={10} template="1fr 1fr" xs="1fr">
        <Input
          label="Nome*:"
          name="name"
          value={values.name}
          labelFixed={!!values.name}
          onChange={handleChange}
        />

        <Input
          label="Telefone:"
          name="phone"
          value={values.phone}
          labelFixed={!!values.phone}
          onChange={handleChangeFormatPhone(setFieldValue)}
        />

        <Input
          label="Login*:"
          name="username"
          labelFixed={!!values.username}
          value={values.username}
          onChange={handleChange}
        />

        <Input
          type="password"
          label="Senha:*"
          name="password"
          value={values.password}
          onChange={handleChange}
        />

        <Input
          label="RG:"
          name="rg"
          labelFixed={!!values.rg}
          value={values.rg}
          onChange={handleChange}
        />

        <Input
          label="CPF:"
          name="cpf"
          value={values.cpf}
          labelFixed={!!values.cpf}
          onChange={handleChangeFormatCPF(setFieldValue)}
        />

        <Input
          type="date"
          label="Data inicial:"
          name="initial_date"
          labelFixed={!!values.initial_date}
          value={values.initial_date}
          onChange={handleChange}
        />

        <Select
          label="Tipo de usuário:"
          name="roleId"
          value={values.roleId}
          onChange={handleChange}
          labelFixed={!!values.roleId}
          options={roles.map(role => ({ label: role.name, value: role.id }))}
        />

        <Select
          label="Equipe de vendas:"
          name="salesTeamId"
          value={values.salesTeamId}
          onChange={handleChange}
          labelFixed={!!values.salesTeamId}
          options={[
            { label: 'Nenhuma equipe', value: '' },
            ...salesTeam.map(saleTeam => ({ label: saleTeam.name, value: saleTeam.id }))
          ]}
        />
      </Grid>

      <Divider my={10} />

      <Text weight="500">Status</Text>
      <Divider />
      <Switch
        label={values.active ? 'Ativo' : 'Desativado'}
        name="active"
        checked={values.active}
        onChange={handleChange}
      />

      <Divider my={10} />

      <Text weight="500">Endereço</Text>
      <Divider />
      <Grid gap={10} template="1fr 1fr" xs="1fr">
        <Input
          label="CEP:"
          name="cep"
          value={values.cep}
          onChange={handleChange}
          onKeyUp={searchCEP}
          labelFixed={!!values.cep}
        />

        <Input
          label="Estado:"
          name="state"
          value={values.state}
          onChange={handleChange}
          labelFixed={!!values.state}
          disabled
        />

        <Input
          label="Cidade:"
          name="city"
          value={values.city}
          onChange={handleChange}
          labelFixed={!!values.city}
          disabled
        />

        <Input
          label="Bairro:"
          name="neighborhood"
          value={values.neighborhood}
          onChange={handleChange}
          labelFixed={!!values.neighborhood}
          disabled
        />

        <Input
          label="Endereço:"
          name="address"
          value={values.address}
          onChange={handleChange}
          labelFixed={!!values.address}
        />

        <Input
          label="Complemento:"
          name="complement"
          value={values.complement}
          onChange={handleChange}
          labelFixed={!!values.complement}
        />
      </Grid>

      <Divider my={10} />

      <Text weight="500">Anotações</Text>
      <Divider />
      <Textarea
        rows={6}
        name="notes"
        label="Anotações:"
        value={values.notes}
        onChange={handleChange} 
      />
      
      <Divider my={10} />

      <Flex items="end" justify="end" gap={10}>
        <Button size="sm" color="gray_500" onClick={() => onClose()}>Cancelar</Button>
        <Button size="sm" color="green_600" onClick={submitForm}>Salvar</Button>
      </Flex>
    </Modal>
  )
}

export default ModalUser