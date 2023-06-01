import { InputHTMLAttributes, FC } from "react"
import { Container, StyledLabel } from "./styles"
import Text from "../text/Text"

export interface SwitchProps  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Switch: FC<SwitchProps> = ({ label, ...props }) => (
  <Container>
    <StyledLabel>
      <input {...props} type="checkbox" />
      <span />
    </StyledLabel>
    {label
      ? <Text>{label}</Text>
      : null
    }
  </Container>
)


export default Switch