import { FC } from 'react'
import { Grid, Input, Select, SideFilters } from "src/components/ui"
import { handleChangeFormatPhone } from "src/utils/form.utils"
import { FormikProps } from 'formik'
import { initialDataSalesFilters } from '../constants'

interface SaleFiltersProps {
  formik: FormikProps<typeof initialDataSalesFilters>,
  statusOpts: { label: string, value: string|number }[]
  usersOpts: { label: string, value: string|number }[]
}

const SaleFilters: FC<SaleFiltersProps> = ({ formik, statusOpts, usersOpts }) => {

  const {
    submitForm,
    handleChange,
    values,
    setFieldValue
  } = formik

  return (
    <SideFilters onFilter={submitForm}>
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
          nullable
        />
        <Select
          label="Vendedor"
          name="seller"
          onChange={handleChange}
          value={values.seller}
          options={usersOpts}
          nullable
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
      </Grid>
    </SideFilters>
  )
}

export default SaleFilters