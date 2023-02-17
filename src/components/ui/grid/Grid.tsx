import styled, { css } from "styled-components"

export interface GridProps {
  gap?: number
  template?: string
  items?: 'center' | 'start' | 'end' | 'stretch'
  justify?: 'center' | 'start' | 'end'
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
}

const Grid = styled.div<GridProps>`
  width: 100%;
  
  display: grid;
  grid-template-columns: ${({ template = '1fr' }) => template};
  gap: ${({ gap = 0 }) => gap}px;

  align-items: ${({ items = 'baseline' }) => items};
  justify-content: ${({ justify = 'start' }) => justify};

  @media (${({ theme }) => theme.device.xl}) {
    ${({ xl }) => xl && css`
      grid-template-columns: ${xl};
    `}
  }

  @media (${({ theme }) => theme.device.lg}) {
    ${({ lg }) => lg && css`
      grid-template-columns: ${lg};
    `}
  }

  @media (${({ theme }) => theme.device.md}) {
    ${({ md }) => md && css`
      grid-template-columns: ${md};
    `}
  }

  @media (${({ theme }) => theme.device.sm}) {
    ${({ sm }) => sm && css`
      grid-template-columns: ${sm};
    `}
  }

  @media (${({ theme }) => theme.device.xs}) {
    ${({ xs }) => xs && css`
      grid-template-columns: ${xs};
    `}
  }
`

export default Grid