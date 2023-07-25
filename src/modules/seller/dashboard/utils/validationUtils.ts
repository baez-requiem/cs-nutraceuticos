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

export const validateNewSale = (values: typeof initialDataFormNewSale): {} => {
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