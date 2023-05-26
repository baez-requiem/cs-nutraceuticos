import { FC } from "react"
import { Divider, Grid, Modal, Text, Input, Textarea, Flex, Button, Select } from "src/components/ui"
import { useModalSeller } from "./hooks/useModalSeller"
import { useSellers } from "./hooks/useSellers"

export interface ModalSellerProps {
  show: boolean
  data?: any
  onClose: () => void
}

const ModalSeller: FC<ModalSellerProps> = ({
  show,
  data,
  onClose
}) => {

  const titleText = !data?.id ? 'Cadastrar vendedor' : `Editar vendedor - ${data?.name || 'Fulano de tal'}`

  const {
    searchCEP,
    formik: {
      values,
      handleChange
    }
  } = useModalSeller()

  return (
    <Modal show={show} onClose={onClose} maxWidth={600}>
      <Text size="xl" weight="600">{titleText}</Text>

      <Divider my={10} />

      <Text weight="500">Dados principais</Text>
      <Divider />
      <Grid gap={10} template="1fr 1fr">
        <Input label="Nome*:" />
        <Input label="Telefone:" />
        <Input label="RG:" />
        <Input label="CPF:" />
        <Input label="Login*:" />
        <Input type="password" label="Senha:*" />
        <Input type="date" label="Data inicial:" value="2021-01-10" readOnly />
        <Select label="Status*" options={[{ label: 'Ativo', value: 1 }, { label: 'Desativado', value: 0 }]} />
        <Select label="Equipe" options={[{ label: 'Alfa', value: 1 }]} />
      </Grid>

      <Divider my={10} />

      <Text weight="500">Endereço</Text>
      <Divider />
      <Grid gap={10} template="1fr 1fr">
        <Input label="CEP:" name="cep" value={values.cep} onChange={handleChange} onBlur={searchCEP} labelFixed={!!values.cep} />
        <Input label="Estado:" name="state" value={values.state} onChange={handleChange} labelFixed={!!values.state} disabled />
        <Input label="Cidade:" name="city" value={values.city} onChange={handleChange} labelFixed={!!values.city} disabled />
        <Input label="Bairro:" name="neighborhood" value={values.neighborhood} onChange={handleChange} labelFixed={!!values.neighborhood} disabled />
        <Input label="Endereço:" name="address" value={values.address} onChange={handleChange} labelFixed={!!values.address} />
        <Input label="Complemento:" name="complement" value={values.complement} onChange={handleChange} labelFixed={!!values.complement} />
      </Grid>

      <Divider my={10} />

      <Text weight="500">Anotações</Text>
      <Divider />
      <Textarea label="Anotações:" rows={6} />
      
      <Divider my={10} />

      <Flex items="end" justify="end" gap={10}>
        <Button size="sm" color="gray_500" onClick={onClose}>Cancelar</Button>
        <Button size="sm" color="green_600">Salvar</Button>
      </Flex>
    </Modal>
  )
}

export default ModalSeller