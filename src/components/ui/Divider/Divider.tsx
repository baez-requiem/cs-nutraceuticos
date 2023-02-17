import { FC } from "react"
import { ColorsType } from "src/theme/theme.default"
import { Container, Line } from "./divider.styles"

export interface DividerProps {
  my?: number
  mt?: number
  mb?: number
  line?: boolean
  opacityLine?: number
  color?: ColorsType
}

const Divider: FC<DividerProps> = ({
  my,
  mt,
  mb,
  line,
  color,
  opacityLine
}) => (
  <Container
    mt={mt}
    mb={mb}
    my={my}
  >
    {line ? <Line opacity={opacityLine} color={color} /> : null}
  </Container>
)

export default Divider