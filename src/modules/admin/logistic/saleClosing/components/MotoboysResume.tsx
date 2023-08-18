import { FC } from 'react'
import { Divider, Flex, Grid, Paper, ResumeCard, Text } from "src/components/ui"
import { Sale } from "src/services/api/logistic/logistic.types"
import { getMotoboysResume } from "../utils/mappers"
import { floatToReal } from 'src/utils/number.utils'

interface MotoboysResumeProps {
  sales: Sale[]
}

const MotoboysResume: FC<MotoboysResumeProps> = ({ sales }) => {

  const resume = getMotoboysResume(sales)

  return (
    <ResumeCard title='Resumo por motoboy'>
      {resume.map(r => (
        <Paper width={300} key={`resume-motoboy-${r.name}`}>
          <Text weight="500">{r.name}</Text>
          <Divider />
          <Grid gap={10}>
            {r.incomes.map(income => (
              <Flex justify='space-between' items='center' key={`resume-motoboy-${r.name}-income-${income.id}`}>
                <Text>{income.name}:</Text>
                <Text>{floatToReal(income.total)}</Text>
              </Flex>
            ))}
            <Divider line opacityLine={0.15} />
            <Flex justify='space-between' items='center'>
              <Text>Total em entregas:</Text>
              <Text>{floatToReal(r.deliveryValue)}</Text>
            </Flex>
            <Divider line opacityLine={0.15} />
            <Flex justify='space-between' items='center'>
              <Text>Saldo:</Text>
              <Text color={r.balance >= 0 ? 'green_600' : 'red_600'}>{floatToReal(r.balance)}</Text>
            </Flex>
            <Divider line opacityLine={0.15} />
            <Text weight='500'>Produtos:</Text>
            {r.products.map(p => (
              <Flex justify='space-between' items='center' key={`resume-motoboy-${r.name}-product-${p.id}`}>
                <Text>{p.name}:</Text>
                <Text>{p.quantity}x</Text>
              </Flex>
            ))}
          </Grid>
        </Paper>
      ))}
    </ResumeCard>
  )
}

export { MotoboysResume }