import { getEndMonthValue, getStartMonthValue } from "src/utils/date.utils"

export const initialDataFormLogisticInfos = {
  id_sale_status: '',
  delivery_value: '',
  id_delivery_type: '',
  delivery_date: '',
  id_motoboy: '',
  notes: '',
  tracking_code: '',
}

export const initialDataSalesFilters = {
  init_date: getStartMonthValue(new Date()),
  end_date: getEndMonthValue(new Date()),
  status: '',
  seller: '',
  client_name: '',
  client_phone: '',
}