import { z } from "zod"
import { initialDataFormNewSale } from "../constants"
import { toast } from "react-toastify"

const newSaleSchema = z.object({
  name: z.string().nonempty("Nome não deve ser vazio."),
  phone: z.string().nonempty("Telefone não deve ser vazio."),
  media_id: z.string().nonempty("Selecione um mídia."),
  payment_type_id: z.string().nonempty("Selecione uma forma de pagamento."),
  products: z.any().array().nonempty("Adicione produtos.")
})

export const validateSale = (values: typeof initialDataFormNewSale): {} => {
  const errors = {}

  const result = newSaleSchema.safeParse(values)

  if (!result.success && 'error' in result) {
    result.error.issues.forEach(err => {
      errors[err.path[0]] = err.message
      toast.error(err.message)
    })
  }

  return errors
}

export const parseSaleSubmit = (values: typeof initialDataFormNewSale, id: string) => {
  const parsedValues = {
    ...values,
    id,
    card_installments: values.card_installments ? parseInt(values.card_installments): null,
    discounts: parseInt(values.discounts.toString() || '0'),
    products: values.products.map(p => ({
      id_product: p.id_product,
      quantity: parseInt(p.quantity.toString()),
      sales_quantity: parseInt(p.sales_quantity.toString()),
    }))
  }

  return parsedValues
}