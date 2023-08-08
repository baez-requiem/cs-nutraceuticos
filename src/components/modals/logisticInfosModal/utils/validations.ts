import { z } from "zod"
import { initialValuesFormLogisticInfos } from "../constants"
import { toast } from "react-toastify"
import { realToFloat } from "src/utils/number.utils"

const logisticInfosSchema = z.object({
  id_sale_status: z.string().nonempty("Selecione um status."),
  delivery_date: z.string().nonempty("Selecione a data de entrega."),
})

export const validateLogisticInfos = (values: typeof initialValuesFormLogisticInfos): {} => {
  const errors = {}

  const result = logisticInfosSchema.safeParse(values)

  if (!result.success && 'error' in result) {
    result.error.issues.forEach(err => {
      errors[err.path[0]] = err.message
      toast.error(err.message)
    })
  }

  if (values.id_delivery_type === 'motoboy' && !values.id_motoboy) {
    errors['id_motoboy'] = 'Selecione um motoboy'
    toast.error('Selecione um motoboy')
  }

  return errors
}

export const parseLogisticInfosSubmit = (values: typeof initialValuesFormLogisticInfos, id_sale: string) => {
  const parsedValues: { [key: string]: string | number } = {
    ...values,
    id_sale,
    delivery_value: realToFloat(values.delivery_value || '0'),
  }

  if (values.id_delivery_type !== 'motoboy') {
    parsedValues.id_motoboy = null
  }
  
  if (values.id_delivery_type !== 'correios') {
    parsedValues.tracking_code = null
  }

  return parsedValues
}