import { FC } from "react"
import { Grid, Text } from "src/components/ui"
import { floatToReal } from "src/utils/number.utils"

interface ProductFieldProps {
  name: string
  unit_value: number
  quantity: number
}

const ProductField: FC<ProductFieldProps> = ({ name, unit_value, quantity }) => {

  return (
    <Grid gap={5} template="4fr 2fr 1fr 2fr">
      <Text color="gray_900">{name}</Text>
      <Text color="gray_900" align="right">R$ {floatToReal(unit_value)}</Text>
      <Text color="gray_900" align="right">{quantity}x</Text>
      <Text color="gray_900" align="right">R$ {floatToReal(unit_value*quantity)}</Text>
    </Grid>
  )
}

export { ProductField }