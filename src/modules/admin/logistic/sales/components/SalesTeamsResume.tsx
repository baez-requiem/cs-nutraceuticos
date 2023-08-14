import { FC } from "react"
import { Divider, Flex, Grid, Paper, ResumeCard, Text } from "src/components/ui"
import { Sale } from "src/services/api/logistic/logistic.types"
import { floatToReal } from "src/utils/number.utils"
import { getSalesTeamsResume } from "../utils/mappers"

interface SalesTeamsResumeProps {
  sales: Sale[]
}

const SalesTeamsResume: FC<SalesTeamsResumeProps> = ({ sales }) => {

  const resume = getSalesTeamsResume(sales)

  return (
    <ResumeCard title='Resumo por equipe'>
      {resume.map(r => (
        <Paper width={300} key={`sales-team-resume-${r.name}`}>
          <Grid gap={10}>
            <Text weight="600">{r.name}</Text>
            <Divider line opacityLine={0.15} />

            <Text weight="500">Receita</Text>
            {r.incomes.map(income => (
              <Flex justify='space-between' items='center' key={`sales-team-resume-${r.name}-income-${income.id}`}>
                <Text>{income.name}:</Text>
                <Text>{floatToReal(income.total)}</Text>
              </Flex>
            ))}
            <Flex justify='space-between' items='center'>
              <Text>Total</Text>
              <Text color="black">{floatToReal(r.totalIncomes)}</Text>
            </Flex>
            <Divider line opacityLine={0.15} />

            <Text weight="500">Vendas</Text>
            <Flex justify='space-between' items='center'>
              <Text>Total</Text>
              <Text color="black">{r.totalSales}</Text>
            </Flex>
            <Divider line opacityLine={0.15} />

            <Text weight="500">Produtos</Text>
            {r.products.map(product => (
              <Flex justify='space-between' items='center' key={`sales-team-resume-${r.name}-product-${product.id}`}>
                <Text>{product.name}:</Text>
                <Text>{product.quantity}</Text>
              </Flex>
            ))}
            <Flex justify='space-between' items='center'>
              <Text>Total</Text>
              <Text color="black">{r.totalProducts}</Text>
            </Flex>
          </Grid>
        </Paper>
      ))}
    </ResumeCard>
  )
}

export { SalesTeamsResume }