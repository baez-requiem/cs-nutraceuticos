import { AiOutlineAlert } from "react-icons/ai"
import { IoMdTrash } from "react-icons/io"
import { Badge, Divider, Flex, Grid, IconButton, Paper, Text } from "src/components/ui"
import { DistributionCenterStockType } from "src/services/api/distributionCenters/distributionCenters.types"
import { ColorsType } from "src/theme/theme.default"

interface CentersListProps {
  data: DistributionCenterStockType[]
  openModal: (show: 'supply' | 'leave', data?: DistributionCenterStockType) => () => void
}

const CentersList = ({ data, openModal }: CentersListProps) => {

  const badgeColor = ({ quantity, supply_quantity_notice }: DistributionCenterStockType['stock'][0]): ColorsType => {
    if (quantity === 0) return 'gray_500'
    if (quantity < 0) return 'red_700'
    if (quantity < supply_quantity_notice) return 'amber_600'

    return 'sky_600'
  }

  return (
    <Paper>
      <Flex gap={20} style={{ overflowX: 'auto' }}>
        {data.map(dc => (
          <Paper width={300} key={`dc-cl-${dc.id}`}>
            <Grid gap={10}>
              <Flex gap={20} justify="space-between" items="center">
                <Text size="lg" weight="500">{dc.name}</Text>

                <Flex gap={10} justify="end" items="center">
                  <IconButton circle color="amber_500" title="Alertas de reposição" onClick={openModal('supply', dc)}>
                    <AiOutlineAlert size={20} color="white"  title="Alertas de reposição" />
                  </IconButton>

                  <IconButton circle color="red_600" title="Registrar saída" onClick={openModal('leave', dc)}>
                    <IoMdTrash size={20} color="white"  title="Registrar saída" />
                  </IconButton>
                </Flex>

              </Flex>

              <Divider line opacityLine={0.15} />

              {dc.stock.map(s => (
                <Badge color={badgeColor(s)} key={`dc-cl-${dc.id}-p-${s.id}`}>
                  <Flex gap={20} justify="space-between">
                    <Text size="sm" color="white" weight="500">{s.name}</Text>
                    <Text size="sm" color="white">{s.quantity}</Text>
                  </Flex>
                </Badge>
              ))}
            </Grid>
          </Paper>
        ))}
      </Flex>
    </Paper>
  )
}

export { CentersList }