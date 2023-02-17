import styled, { css } from "styled-components"

const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  xl2: '1.375rem',
}

export interface TextProps {
  weight?: '100'|'200'|'300'|'400'|'500'| '600'|'700'|'800'|'900'
  size?: 'xs'|'sm'|'md'|'lg'|'xl'|'xl2'
  whiteSpace?: 'nowrap'|'normal'|'break-spaces'|'unset' 
  fontStyle?: 'normal'|'italic'|'oblique'
  color?: string
  p?: number
  pl?: number
  pt?: number
  pr?: number
  pb?: number
}

const Text = styled.span<TextProps>`
  font-weight: ${({ weight }) => weight || 'inherit'};
  font-size: ${({ size }) => fontSize[size || 'md']};
  font-style: ${({ fontStyle }) => fontStyle || 'normal'};
  color: ${({ color }) => color || 'inherit'};
  white-space: ${({ whiteSpace = 'unset' }) => whiteSpace};

  padding: ${({ p = 0 }) => p}px;
  
  ${({ pl }) => typeof pl === "number" && css`padding-left: ${pl}px;`}
  ${({ pt }) => typeof pt === "number" && css`padding-top: ${pt}px;`}
  ${({ pr }) => typeof pr === "number" && css`padding-right: ${pr}px;`}
  ${({ pb }) => typeof pb === "number" && css`padding-bottom: ${pb}px;`}
`

export default Text