import { z } from "zod"
import { initialValuesFormMotoboy } from "../constants"
import { toast } from "react-toastify"

const motoboySchema = z.object({
  name: z.string().nonempty("Nome não deve ser vazio."),
  phone: z.string().nonempty("Telefone não deve ser vazio."),
})

export const validateMotoboy = (values: typeof initialValuesFormMotoboy): {} => {
  const errors = {}

  const result = motoboySchema.safeParse(values)

  if (!result.success && 'error' in result) {
    result.error.issues.forEach(err => {
      errors[err.path[0]] = err.message
      toast.error(err.message)
    })
  }

  return errors
}

// export const parseSaleSubmit = (values: typeof initialDataFormSale, id: string) => {
//   const parsedValues = {
//     ...values,
//     id,
//     paid: !!parseInt(values.paid.toString()),
//     card_installments: (values.card_installments && values.payment_type_id === 'credit_card') ? parseInt(values.card_installments): null,
//     discounts: parseInt(values.discounts.toString() || '0'),
//     products: values.products.map(p => ({
//       id_product: p.id_product,
//       quantity: parseInt(p.quantity.toString()),
//       sales_quantity: parseInt(p.sales_quantity.toString()),
//     }))
//   }

//   return parsedValues
// }