import { FC } from "react"

import {
  Text,
  Fade,
  Flex,
  Grid,
  Modal,
  Input,
  Select,
  Button,
  Divider,
  Textarea,
  IconButton,
} from "src/components/ui"

import {
  DiscountText,
  ProductItem
} from './components'

import * as S from "./styles"

import { AiOutlinePlus } from "react-icons/ai"

import { useSaleModal } from "./hooks/useSaleModal"

import { handleChangeFormatCPF, handleChangeFormatPhone, handleChangeFormatReal } from "src/utils/form.utils"

import { Sale } from "src/services/api/logistic/logistic.types"

export interface ModalSaleProps {
  show: boolean
  onClose: () => void
  data?: Sale
}

const ModalNewSale: FC<ModalSaleProps> = ({
  onClose,
  show,
  data
}) => {

  const {
    searchCEP,
    handleSelect,
    selectValue,
    selectPaymentTypesOpt,
    selectMediasOpt,
    selectProductsOpt,
    addProduct,
    total,
    formik: {
      values,
      handleChange,
      setFieldValue,
      handleSubmit
    },
  } = useSaleModal(show, data, onClose)

  return (
    <Modal show={show} onClose={onClose} maxWidth={600}>
      <Text size="xl" weight="600">Informações da venda</Text>

      <Divider my={10} />

      <form onSubmit={handleSubmit}>

        <Text weight="500">Dados do cliente</Text>
        <Divider />
        <Grid gap={10} template="1fr 1fr" md="1fr">
          <Input
            label="Nome*:"
            name="name"
            value={values.name}
            onChange={handleChange}
            labelFixed={!!values.name}
          />

          <Input
            label="Telefone:*"
            name="phone"
            value={values.phone}
            onChange={handleChangeFormatPhone(setFieldValue)}
            labelFixed={!!values.phone}
          />

          <Input
            label="RG:"
            name="rg"
            value={values.rg}
            onChange={handleChange}
            labelFixed={!!values.rg}
          />

          <Input
            label="CPF:"
            name="cpf"
            value={values.cpf}
            onChange={handleChangeFormatCPF(setFieldValue)}
            labelFixed={!!values.cpf}
          />

          <Input
            label="Email:"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            labelFixed={!!values.email}
          />

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

        <Text weight="500">Dados da venda</Text>
        <Divider my={10} />

        <Flex gap={10} items="end">
          <Select
            block
            label="Adicionar produto"
            options={selectProductsOpt}
            onChange={handleSelect}
            value={selectValue}
            labelFixed={!!selectValue}
          />

          <IconButton
            type="button"
            color="sky_600"
            onClick={addProduct}
            disabled={!selectProductsOpt.length}
          >
            <AiOutlinePlus size={20} color="white" />
          </IconButton>
        </Flex>

        <Divider />

        <S.Table show={!!values.products.length}>
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
            {values.products.map((value, idx) => (
              <ProductItem
                {...{ ...value, idx }}
                key={`product-${idx}`}
                onRemove={() => { }}
                handleChange={handleChange}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3}></th>
              <th>
                <DiscountText total={total} discount={values.discounts} /> </th>
              <th></th>
            </tr>
          </tfoot>
        </S.Table>

        <Divider mb={20} line opacityLine={.25} />

        <Grid gap={10} template="1fr 1fr" xs="1fr">
          <Select
            label="Mídia"
            options={selectMediasOpt}
            name="media_id"
            value={values.media_id}
            onChange={handleChange}
          />

          <Select
            label="Forma de pagamento"
            options={selectPaymentTypesOpt}
            name="payment_type_id"
            value={values.payment_type_id}
            onChange={handleChange}
          />

          <Input
            label="Desconto"
            name="discounts"
            value={values.discounts}
            onChange={handleChangeFormatReal(setFieldValue)}
            labelFixed={!!values.discounts}
          />

          <Fade.FadeIn show={(values.payment_type_id === 'credit_card' && !!total)}>
            <Input
              label="Parcelas"
              name="card_installments"
              type="number"
              min={0}
              max={10}
              value={values.card_installments}
              onChange={handleChange}
              labelFixed={!!values.card_installments}
            />
          </Fade.FadeIn>

          <Select
            label="Pago"
            options={[{ label: "Sim", value: 1 }, { label: "Não", value: 0 }]}
            name="paid"
            value={values.paid}
            onChange={handleChange}
          />
        </Grid>

        <Divider />

        <Textarea
          label="Anotações"
          name="notes"
          value={values.notes}
          onChange={handleChange}
          labelFixed={!!values.notes}
        />

        <Divider my={10} line opacityLine={.15} />

        <Flex items="end" justify="end" gap={10}>
          <Button size="sm" color="gray_500" type="button" onClick={onClose}>Cancelar</Button>
          <Button size="sm" color="green_600" type="submit">Salvar</Button>
        </Flex>
      </form>
    </Modal>
  )
}

export default ModalNewSale