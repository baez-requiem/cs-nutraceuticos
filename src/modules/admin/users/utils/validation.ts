import { z } from "zod"
import { initialDataFormUser } from "../constants"
import { toast } from "react-toastify"
import { onlyNumbers } from "src/utils/number.utils"

const usreSchema = z.object({
  name: z.string().nonempty("Nome não deve ser vazio."),
  login: z.string().nonempty("Login não deve ser vazio."),
  phone: z.string().nonempty("Telefone não deve ser vazio."),
})

export const validateUser = (values: typeof initialDataFormUser, id?: string): {} => {
  const errors = {}

  const result = usreSchema.safeParse(values)

  if (!result.success && 'error' in result) {
    result.error.issues.forEach(err => {
      errors[err.path[0]] = err.message
      toast.error(err.message)
    })
  }

  if (!id && !values.password) {
    errors['password'] = 'Senha não deve ser vazia.'
    toast.error('Senha não deve ser vazia.')
  }

  return errors
}

export const parseUserSubmit = (values: typeof initialDataFormUser) => {
  const parsedValues = {
    ...values,
    initial_date: values.initial_date || null,
    cpf: onlyNumbers(values.cpf),
    rg: onlyNumbers(values.rg),
    phone: onlyNumbers(values.phone),
    cep: onlyNumbers(values.cep),
  }

  return parsedValues
}