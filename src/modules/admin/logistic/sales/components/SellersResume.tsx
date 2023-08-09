import { FC } from "react"
import { Divider, Grid, Paper, Text } from "src/components/ui"
import { Sale } from "src/services/api/logistic/logistic.types"

interface SellersResumeProps {
  sales: Sale[]
}

const SellersResume: FC<SellersResumeProps> = () => {

  return (
    <Paper>
      <Text weight="500">Resumo por vendedor</Text>
      <Divider my={10} />
      <Grid template="1fr 1fr 1fr 1fr">

      </Grid>
    </Paper>
  )
}

export { SellersResume }