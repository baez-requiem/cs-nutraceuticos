import styled from "styled-components"

import { ColorsType } from "src/theme/theme.default"

export interface BadgeProps {
  color?: ColorsType
  block?: boolean
}

const Badge = styled.span<BadgeProps>`
  display: inline-block;
  padding: 5px 10px;

  width: ${({ block }) => block ? '100%' : 'auto'};
  font-weight: 500;

  background-color: ${({ color, theme }) => color ? theme.colors[color] : 'transparent'};
  color: #fff;

  border-radius: 2.5px;

  font-size: 14px;
`

export default Badge