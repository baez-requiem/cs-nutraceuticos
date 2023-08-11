import { FC } from 'react'
import { Badge, Divider, Flex, Grid, Paper, ResumeCard, Text } from "src/components/ui"
import { Sale } from "src/services/api/logistic/logistic.types"
import { getTotalsResume } from "../utils/mappers"
import { floatToReal } from 'src/utils/number.utils'

interface TotalsResumeProps {
  sales: Sale[]
}

const TotalsResume: FC<TotalsResumeProps> = ({ sales }) => {

  const { incomes, total_incomes } = getTotalsResume(sales)

  return (
    <ResumeCard title='Totais'>
      <Paper color='indigo_600'>
        <Grid template='auto auto' gap={10}>
          <Text whiteSpace='nowrap' color='white'>Receita bruta:</Text>
          <Text color='white' align='right'>{floatToReal(total_incomes)}</Text>
        </Grid>
      </Paper>

      {incomes.map(income => (
        <Paper color='indigo_600'>
          <Grid template='auto auto' gap={10}>
            <Text whiteSpace='nowrap' color='white'>Receita {income.name}:</Text>
            <Text color='white' align='right'>{floatToReal(income.total)}</Text>
          </Grid>
        </Paper>
      ))}
    </ResumeCard>
  )
}

export { TotalsResume }