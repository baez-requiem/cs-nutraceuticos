import styled from "styled-components"

const variants = {
  sm: { height: 20, width: 20 },
  md: { height: 32, width: 32 },
}

interface CheckboxProps {
  variant?: 'sm' |'md' | 'lg'
}

const StyledCheckboxInput = styled.input.attrs({
  type: "checkbox",
  variant: "sm"
})<CheckboxProps>`
  height: ${({ variant }) => variants[variant].height}px;
  width: ${({ variant }) => variants[variant].width}px;

  cursor: pointer;
`

export default StyledCheckboxInput