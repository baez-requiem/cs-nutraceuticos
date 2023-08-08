import { z } from "zod"
import { initialDataFormSale } from "../constants"
import { toast } from "react-toastify"

const saleSchema = z.object({
  name: z.string().nonempty("Nome não deve ser vazio."),
  phone: z.string().nonempty("Telefone não deve ser vazio."),
  media_id: z.string().nonempty("Selecione um mídia."),
  payment_type_id: z.string().nonempty("Selecione uma forma de pagamento."),
  products: z.any().array().nonempty("Adicione produtos.")
})

export const validateSale = (values: typeof initialDataFormSale): {} => {
  const errors = {}

  const result = saleSchema.safeParse(values)

  if (!result.success && 'error' in result) {
    result.error.issues.forEach(err => {
      errors[err.path[0]] = err.message
      toast.error(err.message)
    })
  }
  
  if (values.payment_type_id === 'credit_card') {
    if (!values.card_installments) {
      errors['card_installments'] = 'Selecione um número de parcelas.'
      toast.error('Selecione um número de parcelas.')
    }

    if (parseInt(values.card_installments) <= 0 || parseInt(values.card_installments) > 10) {
      errors['card_installments'] = 'Selecione um número de parcelas entre 1 á 10.'
      toast.error('Selecione um número de parcelas entre 1 á 10.')
    }
  }

  return errors
}

export const parseSaleSubmit = (values: typeof initialDataFormSale, id?: string) => {
  const parsedValues = {
    ...values,
    paid: !!parseInt(values.paid.toString()),
    card_installments: (values.card_installments && values.payment_type_id === 'credit_card') ? parseInt(values.card_installments): null,
    discounts: parseInt(values.discounts.toString() || '0'),
    products: values.products.map(p => ({
      id_product: p.id_product,
      quantity: parseInt(p.quantity.toString()),
    }))
  }

  if (id) {
    parsedValues['id'] = id
  }

  return parsedValues
}