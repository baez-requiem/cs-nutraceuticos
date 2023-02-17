import styled from "styled-components"

export interface FlexProps {
  items?: 'center' | 'start' | 'end' | 'stretch'
  justify?: 'baseline' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly'
  gap?: number
  direction?: 'column' | 'row'
  wrap?: boolean
}

const Flex = styled.div<FlexProps>`
  width: 100%;
  
  display: flex;
  
  align-items: ${({ items = 'start' }) => items};
  justify-content: ${({ justify = 'baseline' }) => justify};
  flex-direction: ${({ direction = 'row' }) => direction};
  gap: ${({ gap = 0 }) => gap}px;
  flex-wrap: ${({ wrap }) => wrap ? 'wrap': 'nowrap'};
`

export default Flex