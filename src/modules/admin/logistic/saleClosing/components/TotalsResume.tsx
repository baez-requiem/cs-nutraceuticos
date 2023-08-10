import { FC } from 'react'
import { Badge, Divider, Flex, Grid, Paper, ResumeCard, Text } from "src/components/ui"
import { Sale } from "src/services/api/logistic/logistic.types"
import { getTotalsResume } from "../utils/mappers"
import { floatToReal } from 'src/utils/number.utils'

interface TotalsResumeProps {
  sales: Sale[]
}

const TotalsResume: FC<TotalsResumeProps> = ({ sales }) => {

  const { incomes, products, sales_quantity, total_incomes } = getTotalsResume(sales)

  return (
    <ResumeCard title='Totais'>
      <Badge style={{ width: 200 }} block color="indigo_600">Vendas: {sales_quantity}</Badge>
      <Badge style={{ width: 200 }} block color="indigo_600">Produtos: {products}</Badge>
      <Badge style={{ width: 200 }} block color="indigo_600">Receita bruta: {floatToReal(total_incomes)}</Badge>
      {incomes.map(income => (
        <Badge style={{ width: 200 }} block color="indigo_600">Receita {income.name}: {floatToReal(income.total)}</Badge>
      ))}
    </ResumeCard>
  )
}

export { TotalsResume }