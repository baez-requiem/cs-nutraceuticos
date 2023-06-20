import { FC } from "react"
import { Button, Divider, Flex, Grid, IconButton, Input, Modal, Select, Text } from "src/components/ui"
import { useModalNewSale } from "../hooks/useModalNewSale"
import { StyledTable } from "../styles"
import ProductItem from "src/modules/admin/stock/components/ProductItem"
import { AiOutlinePlus } from "react-icons/ai"

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
    selectPaymentTypesOpt,
    selectMediasOpt,
    selectProductsOpt,
    formik: {
      values,
      handleChange
    },
  } = useModalNewSale()

  return (
    <Modal show={show} onClose={onClose} maxWidth={600}>
      <Text size="xl" weight="600">Nova venda</Text>

      <Divider my={10} />

      <Text weight="500">Dados do cliente</Text>
      <Divider />
      <Grid gap={10} template="1fr 1fr" md="1fr">
        <Input label="Nome*:" />
        <Input label="Telefone:*" />
        <Input label="RG:" />
        <Input label="CPF:" />
        <Input label="Email:" />

        <Input label="CEP:" name="cep" value={values.cep} onChange={handleChange} onKeyUp={searchCEP} labelFixed={!!values.cep} />
        <Input label="Estado:" name="state" value={values.state} onChange={handleChange} labelFixed={!!values.state} disabled />
        <Input label="Cidade:" name="city" value={values.city} onChange={handleChange} labelFixed={!!values.city} disabled />
        <Input label="Bairro:" name="neighborhood" value={values.neighborhood} onChange={handleChange} labelFixed={!!values.neighborhood} disabled />
        <Input label="Endereço:" name="address" value={values.address} onChange={handleChange} labelFixed={!!values.address} />
        <Input label="Complemento:" name="complement" value={values.complement} onChange={handleChange} labelFixed={!!values.complement} />
      </Grid>

      <Divider my={10} />

      <Text weight="500">Produtos</Text>

      <Flex gap={10} items="end">
        <Select
          block
          label="Produto"
          options={selectProductsOpt}
          // onChange={handleSelect}
          // value={selectValue}
          // labelFixed={!!selectValue}
        />
        
        <IconButton
          color="sky_600"
          // onClick={addProduct}
          disabled={!selectProductsOpt.length}
        >
          <AiOutlinePlus size={20} color="white" />
        </IconButton>
      </Flex>

      <Divider my={10} />
     
      <StyledTable>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Qntd.</th>
            <th>Qntd. vendas</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <ProductItem onRemove={() => {}} id="a12" name="12" />
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3}></th>
            <th>100,00</th>
            <th></th>
          </tr>
        </tfoot>
      </StyledTable>

      <Text weight="500">Dados da venda</Text>
      <Divider />
      <Grid gap={10} template="1fr 1fr" md="1fr">
        <Select label="Mídia" options={selectMediasOpt} />
        <Select label="Forma de pagamento" options={selectPaymentTypesOpt} />
        <Input label="Desconto" />
      </Grid>

      <Divider my={10} line opacityLine={.15} />

      <Flex items="end" justify="end" gap={10}>
        <Button size="sm" color="gray_500" onClick={onClose}>Cancelar</Button>
        <Button size="sm" color="green_600">Finalizar</Button>
      </Flex>
    </Modal>
  )
}

export default ModalNewSale