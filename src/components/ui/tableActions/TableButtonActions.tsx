import { FC } from 'react'

import IconButton from "../iconButton/IconButton"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { BsTrash } from "react-icons/bs"

interface ActionProps {
  onClick?: () => void
  title?: string
}

export const EditAciton: FC<ActionProps> = ({ onClick, title = 'Editar' }) => (
  <IconButton color="blue_600" onClick={onClick} title={title}>
    <MdOutlineModeEditOutline color="white" size={20} />
  </IconButton>
)

export const DeleteAciton: FC<ActionProps> = ({ onClick, title = 'Excluir' }) => (
  <IconButton color="red_600" onClick={onClick} title={title}>
    <BsTrash color="white" size={18} />
  </IconButton>
)