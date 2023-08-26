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