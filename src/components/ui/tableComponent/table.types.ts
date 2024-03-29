import { ReactElement } from "react"

export interface TableColumnProps {
  label: string | number
  value: string | number
  align?: 'left' | 'center' | 'right' | string
  render?: ((value: string | number, data: { [key: string]: string | number }, index: number) => ReactElement)
  width?: number
}

export interface TableProps<T extends { [key: string]: string | number }> {
  columns: TableColumnProps[]
  data: T[]
  extraDataRender?: ((data: { [key: string]: string | number }, index: number) => ReactElement)
  minWidth?: number
  title?: string
  id?: string
  pagination?: boolean
  rows?: number
}