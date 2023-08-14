import { FC, ButtonHTMLAttributes } from 'react'

import { IconButton } from "../iconButton/IconButton"
import { AiOutlinePlus } from 'react-icons/ai'

const Plus: FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => (
  <IconButton type="button" {...props} color='sky_600'>
   <AiOutlinePlus size={20} color="white" />
  </IconButton>
)

export { Plus }