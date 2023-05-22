import styled from "styled-components";
import { ColorsType } from "src/theme/theme.default";

export interface IconBadgeProps {
  size?: number
  color: ColorsType
}

const IconBadge = styled.div<IconBadgeProps>`
  height: ${({ size = 40 }) => size}px;
  min-height: ${({ size = 40 }) => size}px;
  
  width: ${({ size = 40 }) => size}px;
  min-width: ${({ size = 40 }) => size}px;

  background-color: ${({ theme, color }) => theme.colors[color]};

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
`

export default IconBadge