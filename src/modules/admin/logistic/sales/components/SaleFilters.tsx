import { FC } from 'react'
import { Grid, Input, Select, SideFilters } from "src/components/ui"
import { handleChangeFormatPhone } from "src/utils/form.utils"
import { useSaleFilters } from '../hooks/useSaleFilters'

interface SaleFiltersProps {
  onFilter: (
    arg0: {
      init_date?: string
      end_date?: string
      status?: string
      seller?: string
      client_name?: string
      client_phone?: string
      number?: number
      products?: string[]
    }
  ) => void
}

const SaleFilters: FC<SaleFiltersProps> = ({ onFilter }) => {

  const {
    statusOpts,
    paymentTypesOpts,
    productsOpts,
    usersOpts,
    formik
  } = useSaleFilters({ onFilter })

  const {
    submitForm,
    handleChange,
    values,
    setFieldValue,
    resetForm
  } = formik

  return (
    <SideFilters onFilter={submitForm} onReset={resetForm}>
      <Grid gap={10}>
        <Input
          name="number"
          label="ID venda"
          type="number"
          onChange={handleChange}
          value={values.number}
        />
        <Input
          name="init_date"
          label="Data da venda"
          type="date"
          onChange={handleChange}
          value={values.init_date}
        />
        <Input
          name="end_date"
          label="até"
          type="date"
          onChange={handleChange}
          value={values.end_date}
        />

        <Select
          label="Status"
          name="status"
          onChange={handleChange}
          value={values.status}
          options={statusOpts}
        />

        <Select
          label="Produto"
          name="products"
          onChange={handleChange}
          value={values.products}
          options={productsOpts}
        />

        <Select
          label="Vendedor"
          name="seller"
          onChange={handleChange}
          value={values.seller}
          options={usersOpts}
        />

        <Input
          label="Nome do cliente"
          name="client_name"
          onChange={handleChange}
          value={values.client_name}
        />

        <Input
          label="Telefone"
          name="client_phone"
          onChange={handleChangeFormatPhone(setFieldValue)}
          value={values.client_phone}
        />

        <Select
          label="Método de pagamento"
          name="payment_type"
          onChange={handleChange}
          value={values.payment_type}
          options={paymentTypesOpts}
        />
      </Grid>
    </SideFilters>
  )
}

export default SaleFilters