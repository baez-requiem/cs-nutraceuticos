import  { FC, ReactElement, useState } from "react"

import {
  Container,
  StyledTable,
} from "./table.styles"

import TableBody from "./TableBody"
import TableHeader from "./TableHeader"

export interface TableColumnProps {
  label: string | number
  value: string | number
  align?: 'left' | 'center' | 'right' | string
  render?: ((value: string | number, data: { [key: string]: string | number }, index: number) => ReactElement)
  width?: number
}

export interface TableProps {
  columns: TableColumnProps[]
  data: { [key: string]: string | number }[]
  extraDataRender?: ((data: { [key: string]: string | number }, index: number) => ReactElement)
  minWidth?: number
}

const Table: FC<TableProps> = ({
  columns = [],
  data = [],
  extraDataRender,
  minWidth,
}) => {
  const [showExtraRow, setShowExtraRow] = useState<number[]>([])

  const toggleRow = (i: number) => {
    const hasShow = showExtraRow.includes(i)
    const newData = !hasShow ? [...showExtraRow, i] : showExtraRow.filter(v => v != i)
    
    setShowExtraRow(newData)
  }

  return (
    <Container>
      <StyledTable minWidth={minWidth}>
        <TableHeader
          columns={columns}
          hasExtraData={!!extraDataRender}
        />
        <TableBody
          extraDataRender={extraDataRender}
          columns={columns}
          data={data}
          toggleRow={toggleRow}
          extraRow={showExtraRow}
        />
      </StyledTable>
    </Container>
  )
}

export default Table