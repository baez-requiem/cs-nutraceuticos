import { FC } from 'react'
import { Badge, Table, TableActions } from "src/components/ui"
import { matchColor } from "src/utils/theme"

interface SaleTableProps {
  data: { [key: string]: string | number }[]
  openModalSale: (arg0: string) => () => void
  openModalLogisticInfos: (arg0: string) => () => void
  openModalHistory: (arg0: string) => () => void
  salePDF: (arg0: string, arg1?: boolean) => () => void
}

const SaleTable: FC<SaleTableProps> = ({
  data,
  openModalHistory,
  openModalLogisticInfos,
  openModalSale,
  salePDF
}) => {

  return (
    <Table
      columns={[
        { label: '#', value: 'number' },
        { label: 'Data', value: 'date' },
        { label: 'Vendedor', value: 'user_name' },
        { label: 'Qntd. vendas', value: 'total_sales' },
        { label: 'Qntd. produtos', value: 'total_products' },
        { label: 'Valor total', value: 'total_amount' },
        {
          label: 'Status', value: 'status', render: (value, obj) => (
            <Badge block color={matchColor(obj.color_status?.toString()) || 'black'}>{value}</Badge>
          )
        },
        {
          label: 'Ações', align: 'center', value: 'id', render: (value, data) => (
            <TableActions actions={[
              { type: 'Vizualizer', onClick: openModalSale(value.toString()) },
              { type: 'Edit', onClick: openModalLogisticInfos(value.toString()) },
              { type: 'History', onClick: openModalHistory(value.toString()) },
              { type: 'PDF', onClick: salePDF(value.toString()), show: !!data.showPdf },
              { type: 'PNG', onClick: salePDF(value.toString(), true), show: !!data.showPdf },
            ]} />
          )
        },
      ]}
      data={data}
    />
  )
}

export default SaleTable