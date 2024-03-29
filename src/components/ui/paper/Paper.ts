import { ColorsType } from "src/theme/theme.default"
import styled from "styled-components"

const Paper = styled.div<{ color?: ColorsType, width?: number }>`
  padding: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #0007;

  background-color: ${({ theme, color = 'gray_50' }) => theme.colors[color]};

  width: ${({ width }) => width ? (width+'px') : 'auto'};
  min-width: ${({ width }) => width ? (width+'px') : 'auto'};
`

export default Paper