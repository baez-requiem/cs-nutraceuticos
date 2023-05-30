import { FC } from "react"
import { Divider, Grid, Input, Modal, Select, Text } from "src/components/ui"
import { useModalNewSale } from "../hooks/useModalNewSale"

export interface ModalNewSaleProps {
  show: boolean
  onClose: () => void
}

const ModalNewSale: FC<ModalNewSaleProps> = ({
  onClose,
  show
}) => {

  const {
    searchCEP,
    formik: {
      values,
      handleChange
    }
  } = useModalNewSale()

  return (
    <Modal show={show} onClose={onClose} maxWidth={600}>
      <Text size="xl" weight="600">Nova venda</Text>

      <Divider my={10} />

      <Text weight="500">Dados do cliente</Text>
      <Divider />
      <Grid gap={10} template="1fr 1fr" md="1fr">
        <Input label="Nome*:" />
        <Input label="Telefone:" />
        <Input label="RG:" />
        <Input label="CPF:" />
        <Input label="Email*:" />

        <Input label="CEP:" name="cep" value={values.cep} onChange={handleChange} onKeyUp={searchCEP} labelFixed={!!values.cep} />
        <Input label="Estado:" name="state" value={values.state} onChange={handleChange} labelFixed={!!values.state} disabled />
        <Input label="Cidade:" name="city" value={values.city} onChange={handleChange} labelFixed={!!values.city} disabled />
        <Input label="Bairro:" name="neighborhood" value={values.neighborhood} onChange={handleChange} labelFixed={!!values.neighborhood} disabled />
        <Input label="Endereço:" name="address" value={values.address} onChange={handleChange} labelFixed={!!values.address} />
        <Input label="Complemento:" name="complement" value={values.complement} onChange={handleChange} labelFixed={!!values.complement} />
      </Grid>

      <Divider my={10} />

      <Text weight="500">Produtos</Text>
      <Select label="Pesquisar produto..." options={[{label: '', value: ''},{ label: 'produto', value: '1' }]} />
      <Divider />
    </Modal>
  )
}

export default ModalNewSale