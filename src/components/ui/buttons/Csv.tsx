import { FCButtonType } from './types'

import { BsFiletypeCsv } from "react-icons/bs"
import { IconButton } from "../iconButton/IconButton"

const Csv: FCButtonType = props => (
  <IconButton title='CSV' type="button" {...props} color='green_500'>
    <BsFiletypeCsv size={20} color='white' />
  </IconButton>
)

export { Csv }