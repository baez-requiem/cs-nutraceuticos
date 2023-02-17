import React, { FC, ReactElement, useState } from "react"

import { BsPlus } from "react-icons/bs"
import { AiOutlineMinus } from 'react-icons/ai'
import { IconButton } from "../"

import {
  StyledTD,
  TBody,
} from "./table.styles"

import { TableColumnProps } from './Table'

export interface TableBodyProps {
  columns: TableColumnProps[]
  data: { [key: string]: string | number }[]
  extraDataRender?: ((data: { [key: string]: string | number }, index: number) => ReactElement)
  extraRow?: number[],
  toggleRow?: (arg0: number) => void
}

const TableBody: FC<TableBodyProps> = ({
  columns = [],
  data = [],
  extraDataRender,
  extraRow = [],
  toggleRow
}) => (
  <TBody>
    {data.map((dataObj, dataIndex) => (
      <React.Fragment key={dataIndex + 't'}>
        <tr>
          {extraDataRender ? (
            <StyledTD>
              <IconButton onClick={() => toggleRow?.(dataIndex)}>
                {extraRow.includes(dataIndex) ? (
                  <AiOutlineMinus />
                ) : (
                  <BsPlus size={20} />
                )}
              </IconButton>
            </StyledTD>
          ) : null}
          {columns.map((col, colIndex) => (
            <StyledTD
              key={dataIndex + 'c' + colIndex}
              paddingNone={!!col.render}
            >
              {
                col.render?.(dataObj[col.value], dataObj, dataIndex) || dataObj[col.value]
              }
            </StyledTD>
          ))}
        </tr>
        {extraDataRender && extraRow.includes(dataIndex) && (
          <tr>
            <StyledTD colSpan={columns.length + 1}>
              {extraDataRender(dataObj, dataIndex)}
            </StyledTD>
          </tr>
        )}
      </React.Fragment>
    ))}
  </TBody>
)



export default TableBody