import { FC } from 'react'

import IconButton from "../iconButton/IconButton"

import { MdOutlineModeEditOutline } from "react-icons/md"
import { BsBoxSeam, BsFiletypePdf, BsTrash } from "react-icons/bs"
import { AiOutlineEye } from 'react-icons/ai'
import { BiHistory } from 'react-icons/bi'

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

export const PDFAciton: FC<ActionProps> = ({ onClick, title = 'PDF' }) => (
  <IconButton color="red_500" onClick={onClick} title={title}>
    <BsFiletypePdf color="white" size={18} />
  </IconButton>
)

export const StockAciton: FC<ActionProps> = ({ onClick, title = 'Excluir' }) => (
  <IconButton color="cyan_500" onClick={onClick} title={title}>
    <BsBoxSeam color="white" size={18} />
  </IconButton>
)

export const VizualizerAciton: FC<ActionProps> = ({ onClick, title = 'Visualizer' }) => (
  <IconButton color="sky_500" onClick={onClick} title={title}>
    <AiOutlineEye color="white" size={18} />
  </IconButton>
)

export const HistoryAciton: FC<ActionProps> = ({ onClick, title = 'Histórico' }) => (
  <IconButton color="gray_500" onClick={onClick} title={title}>
    <BiHistory color="white" size={18} />
  </IconButton>
)