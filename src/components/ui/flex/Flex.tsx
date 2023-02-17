import styled from "styled-components"

export interface FlexProps {
  items?: 'center' | 'start' | 'end' | 'stretch'
  justify?: 'baseline' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly'
  gap?: number
  direction?: 'column' | 'row'
  wrap?: boolean
}

const Flex = styled.div<FlexProps>`
  display: flex;
  
  justify-content: ${({ justify = 'baseline' }) => justify};
  flex-direction: ${({ direction = 'row' }) => direction};
  align-items: ${({ items = 'start' }) => items};
  flex-wrap: ${({ wrap }) => wrap ? 'wrap': 'nowrap'};
  gap: ${({ gap = 0 }) => gap}px;
  
  width: 100%;
`

export default Flex