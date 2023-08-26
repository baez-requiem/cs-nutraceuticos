import { FC, useId } from 'react'

import Flex from "../flex/Flex"

import {
  DeleteAciton,
  EditAciton,
  HistoryAciton,
  PDFAciton,
  StockAciton,
  VizualizerAciton
} from './TableButtonActions'

interface TableActionsProps {
  actions?: {
    type: 'Edit' | 'Delete' | 'Stock' | 'PDF' | 'Vizualizer' | 'History'
    onClick?: () => void
    title?: string
    show?: boolean
  }[]
}

const ActionButton = ({ type, onClick, title, show = true }: TableActionsProps['actions'][0]) => {

  if (!show) {
    return null
  }

  switch (type) {
    case 'PDF':        return <PDFAciton onClick={onClick} title={title} />
    case 'Edit':       return <EditAciton onClick={onClick} title={title} />
    case 'Stock':      return <StockAciton onClick={onClick} title={title} />
    case 'Delete':     return <DeleteAciton onClick={onClick} title={title} />
    case 'History':    return <HistoryAciton onClick={onClick} title={title} />
    case 'Vizualizer': return <VizualizerAciton onClick={onClick} title={title} />
  }
}

const TableActions: FC<TableActionsProps> = ({ actions = [] }) => {
  const id = useId()

  return (
    <Flex justify="center" gap={10}>
      {actions.map(action => <ActionButton key={`${id}-${action.type}`} {...action} />)}
    </Flex>
  )
}

export default TableActions