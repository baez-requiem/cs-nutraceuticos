import styled, { css } from "styled-components"
import { ColorsType } from "src/theme/theme.default"

interface ContainerProps {
  my?: number
  mt?: number
  mb?: number
}

interface LineProps {
  color?: ColorsType
  opacity?: number
}

export const Container = styled.div<ContainerProps>`
  ${({ my = 5, mt, mb }) => css`
    padding-top: ${mt ?? my}px;
    padding-bottom: ${mb ?? my}px;
  `}
`

export const Line = styled.div<LineProps>`
  height: 1px;
  background-color: ${({ theme, color = 'gray_600' }) => theme.colors[color]};
  opacity: ${({ opacity = 1 }) => opacity};
`