import { FC } from "react"
import { Grid, Text } from "src/components/ui"
import { floatToReal } from "src/utils/number.utils"

interface BatchesProductsType {
  products: {
    name: string
    quantity: string
    amount: string
  }[]
}

const BatchesProducts: FC<BatchesProductsType> = ({ products }) => {

  return (
    <>
      {products.map(p => (
        <Grid template="2fr 1fr 1fr" key={`${p.name}-${p.quantity}-${p.amount}`}>
          <Text size="sm">{p.name}</Text>
          <Text size="sm" align="right">{p.quantity} Und.</Text>
          <Text size="sm" align="right">R$ {floatToReal(parseFloat(p.amount))}</Text>
        </Grid>
      ))} 
    </>
  )
}

export default BatchesProducts