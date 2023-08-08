import { getEndMonthValue, getStartMonthValue } from "src/utils/date.utils"

export const initialDataSalesFilters = {
  init_date: getStartMonthValue(new Date()),
  end_date: getEndMonthValue(new Date()),
  status: '',
  seller: '',
  client_name: '',
  client_phone: '',
  number: ''
}