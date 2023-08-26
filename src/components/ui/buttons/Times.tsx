import { FCButtonType } from './types'

import { IconButton } from "../iconButton/IconButton"
import { FaTimes } from 'react-icons/fa'

const Times: FCButtonType = props => (
  <IconButton type="button" {...props} color="red_600">
    <FaTimes size={18} color="white" />
  </IconButton>
)

export { Times }