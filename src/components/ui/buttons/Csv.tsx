import { FC, ButtonHTMLAttributes } from 'react'
import { BsFiletypeCsv } from "react-icons/bs"
import { IconButton } from "../iconButton/IconButton"

const Csv: FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => (
  <IconButton {...props} color='green_500' title='CSV'>
    <BsFiletypeCsv size={20} color='white' />
  </IconButton>
)

export { Csv }