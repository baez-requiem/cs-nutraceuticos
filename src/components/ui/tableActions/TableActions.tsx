import { FC, useId } from 'react'

import Flex from "../flex/Flex"

import {
  DeleteAciton,
  EditAciton,
  StockAciton
} from './TableButtonActions'

interface TableActionsProps {
  actions?: {
    type: 'Edit' | 'Delete' | 'Stock'
    onClick?: () => void
    title?: string
  }[]
}

const ActionButton = ({ type, onClick, title }: TableActionsProps['actions'][0]) => {
  switch (type) {
    case 'Edit': return <EditAciton />
    case 'Delete': return <DeleteAciton />
    case 'Stock': return <StockAciton />
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