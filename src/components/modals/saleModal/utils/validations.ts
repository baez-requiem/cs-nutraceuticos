import { z } from "zod"
import { initialDataFormSale } from "../constants"
import { toast } from "react-toastify"

const saleSchema = z.object({
  name: z.string().nonempty("Nome não deve ser vazio."),
  phone: z.string().nonempty("Telefone não deve ser vazio."),
  media_id: z.string().nonempty("Selecione um mídia."),
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

  values.payment_types.forEach((paymentType, idx) => {
    if (paymentType.id_payment_type === 'credit_card') {
      if (!paymentType.card_installments) {
        errors['payment_types'][idx]['card_installments'] = 'Selecione um número de parcelas.'
        toast.error('Selecione um número de parcelas.')
      }
      
      if (parseInt(paymentType.card_installments) <= 0 || parseInt(paymentType.card_installments) > 10) {
        errors['payment_types'][idx]['card_installments'] = 'Selecione um número de parcelas entre 1 á 10.'
        toast.error('Selecione um número de parcelas entre 1 á 10.')
      }
    }
  })
  
  return errors
}