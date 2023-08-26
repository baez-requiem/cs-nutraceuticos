import  { FC, useState } from "react"

import { Divider } from "../"

import { usePagination } from "./hooks/usePagination"

import {
  Container,
  StyledTable,
  TableTitle,
} from "./table.styles"

import { Pagination } from "./Pagination"
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"

import { TableProps } from "./table.types"

const Table: FC<TableProps<{ [key: string]: string | number }>> = ({
  columns = [],
  data = [],
  extraDataRender,
  minWidth,
  title,
  id,
  pagination = true,
  rows
}) => {
  const [showExtraRow, setShowExtraRow] = useState<number[]>([])

  const toggleRow = (i: number) => {
    const hasShow = showExtraRow.includes(i)
    const newData = !hasShow ? [...showExtraRow, i] : showExtraRow.filter(v => v != i)
    
    setShowExtraRow(newData)
  }

  const { paginationData, ...paginationProps} = usePagination(data, rows)

  return (
    <>
      <Container>
        {title ? (
          <TableTitle>{title}</TableTitle>
        ) : null}
        <StyledTable minWidth={minWidth} id={id}>
          <TableHeader
            columns={columns}
            hasExtraData={!!extraDataRender}
          />
          <TableBody
            extraDataRender={extraDataRender}
            columns={columns}
            data={pagination ? paginationData : data}
            toggleRow={toggleRow}
            extraRow={showExtraRow}
          />
        </StyledTable>
      </Container>
      {pagination ? (
        <>
          <Divider />
          <Pagination totalData={data.length} config={paginationProps} />
        </>
      ): null}
    </>
  )
}

export default Table