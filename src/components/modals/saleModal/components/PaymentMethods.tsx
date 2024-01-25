import { FC } from "react"
import { FormikProps } from "formik"
import { initialDataFormSale, paidOpts } from "../constants"

import { Buttons, Grid, IconButton, Input, Select } from "src/components/ui"
import { usePaymentMenthods } from "../hooks/usePaymentMenthods"
import { handleChangeFormatReal } from "src/utils/form.utils"

import { BiDollarCircle } from "react-icons/bi"

interface PaymentMethodsProps {
  formik: FormikProps<typeof initialDataFormSale>,
}

const PaymentMethods: FC<PaymentMethodsProps> = ({ formik }) => {

  const {
    addPaymentMethod,
    paymentTypesOpts,
    selectValue,
    handleSelect,
    isCreditCard,
    removePaymentMethod,
    fillRemainingValue
  } = usePaymentMenthods(formik)

  const {
    values,
    handleChange,
    setFieldValue,
  } = formik

  return (
    <Grid gap={10}>
      <Grid template="1fr auto" gap={10} items="end">
        <Select
          label="Adicionar forma de pagamento:"
          options={paymentTypesOpts}
          value={selectValue}
          onChange={handleSelect}
        />
        <Buttons.Plus
          title="Adicionar"
          disabled={!selectValue}
          onClick={addPaymentMethod}
        />
      </Grid>

      <Grid gap={10}>
        {values.payment_types.map((paymentType, idx) => (
          <Grid
            gap={10}
            items="end"
            template={isCreditCard(paymentType) ? '150px 1fr 1fr 100px auto auto' : '150px 1fr 100px auto auto'}
            sm={isCreditCard(paymentType) ? '122px 1fr 52px 85px auto auto' : '122px 1fr 85px auto auto'}
            key={`sale-payment_type-${paymentType.id_payment_type}`}
          >
            <Input
              label="Foma de pagamento:"
              value={paymentType.name}
              labelFixed
              disabled
              block
            />

            <Input
              label="Valor:"
              name={`payment_types.${idx}.amount`}
              value={paymentType.amount}
              block
              onChange={handleChangeFormatReal(setFieldValue)}
            />

            {isCreditCard(paymentType) && (
              <Input
                label="Parcelas"
                name={`payment_types.${idx}.card_installments`}
                type="number"
                block
                min={0}
                max={10}
                value={paymentType.card_installments}
                onChange={handleChange}
                labelFixed={!!paymentType.card_installments}
                required
              />
            )}

            <Select
              label="Situação"
              options={paidOpts}
              name={`payment_types.${idx}.paid`}
              value={paymentType.paid}
              onChange={handleChange}
              nullable
              required
            />

            <IconButton
              type="button"
              color="blue_600"
              title="Preencher com o valor restante"
              onClick={fillRemainingValue(paymentType.id_payment_type)}
            >
              <BiDollarCircle size={22} color="white" />
            </IconButton>

            <Buttons.Times
              title="Excluir"
              onClick={removePaymentMethod(paymentType.id_payment_type)}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export { PaymentMethods }