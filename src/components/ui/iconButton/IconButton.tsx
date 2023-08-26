import styled from "styled-components"

import { ColorsType } from "src/theme/theme.default"

export interface IconButtonProps {
  color?: ColorsType
  size?: number
  circle?: boolean
}

const IconButton = styled.button<IconButtonProps>`
  height: ${({ size = 30 }) => size}px;
  width: ${({ size = 30 }) => size}px;
  min-height: ${({ size = 30 }) => size}px;
  min-width: ${({ size = 30 }) => size}px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: ${({ circle = false }) => circle ? '50%' : '3.5px'};
  border: none;

  background-color: ${({ theme, color }) => color ? theme.colors[color] : 'transparent'};

  :disabled {
    pointer-events: none;
  }

  :not([disabled]) {
    cursor: pointer;
    transition: all .2s;
    color: inherit;
  
    :hover{
      filter: brightness(.8);
      box-shadow: 0px 0px 5px 5px ${({ theme, color }) => theme.colors[color || 'gray_800']}20;
    }
  }

`

export { IconButton }