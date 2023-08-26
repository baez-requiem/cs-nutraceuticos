import { FC, ButtonHTMLAttributes } from 'react'

type CustomButtonType = {
  size?: number
  circle?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export type FCButtonType = FC<CustomButtonType>