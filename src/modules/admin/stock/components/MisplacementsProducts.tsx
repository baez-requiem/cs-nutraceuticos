import { FC } from "react"
import { Grid, Text } from "src/components/ui"

interface MisplacementsProductsType {
  products: {
    name: string
    quantity: string
  }[]
}

const MisplacementsProducts: FC<MisplacementsProductsType> = ({ products }) => {

  return (
    <div style={{ maxHeight: 52, overflowY: 'auto' }}>
      {products.map(p => (
        <Grid template="2fr 1fr" key={`${p.name}-${p.quantity}`} style={{ minWidth: 250 }}>
          <Text size="sm">{p.name}</Text>
          <Text size="sm" align="right">{p.quantity} Und.</Text>
        </Grid>
      ))} 
    </div>
  )
}

export default MisplacementsProducts