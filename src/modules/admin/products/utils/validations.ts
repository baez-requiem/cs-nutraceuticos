import { z } from "zod"
import { initialValuesFormProduct } from "../constants"
import { toast } from "react-toastify"
import { onlyNumbers, realToFloat } from "src/utils/number.utils"

const productSchema = z.object({
  name: z.string().nonempty("Nome não deve ser vazio."),
  amount: z.string().nonempty("Valor não deve ser vazio."),
})

export const validateProduct = (values: typeof initialValuesFormProduct, id?: string): {} => {
  const errors = {}

  const result = productSchema.safeParse(values)

  if (!result.success && 'error' in result) {
    result.error.issues.forEach(err => {
      errors[err.path[0]] = err.message
      toast.error(err.message)
    })
  }

  if (values.amount && realToFloat(values.amount || '0') <= 0) {
    errors['amount'] = 'Valor deve ser maior que 0.'
    toast.error('Valor deve ser maior que 0.')
  }

  console.log(errors)

  return errors
}

export const parseProductSubmit = (values: typeof initialValuesFormProduct) => {
  const parsedValues = {
    ...values,
    supply_quantity_notice: values.supply_quantity_notice ? parseInt(values.supply_quantity_notice) : null,
    amount: realToFloat(values.amount)
  }

  return parsedValues
}