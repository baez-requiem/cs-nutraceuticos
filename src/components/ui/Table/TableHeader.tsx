import  { FC } from "react"

import { StyledTH, THead } from "./table.styles"

import { TableColumnProps } from './Table'

export interface TableHeaderProps {
  columns: TableColumnProps[]
  hasExtraData?: boolean
}

const TableHeader: FC<TableHeaderProps> = ({
  columns = [],
  hasExtraData,
}) => (
  <THead>
    <tr>
      {hasExtraData ? (
        <StyledTH width={40}>
        </StyledTH>
      ) : null}
      {columns.map((c, colIndex) => (
        <StyledTH key={colIndex + 'c'} text={c.align} width={c.width}>
          {c.label}
        </StyledTH>
      ))}
    </tr>
  </THead>
)


export default TableHeader