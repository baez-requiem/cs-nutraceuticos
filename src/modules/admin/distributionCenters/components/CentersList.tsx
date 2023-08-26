import { AiOutlineAlert, AiOutlineHistory } from "react-icons/ai"
import { BiMinus } from "react-icons/bi"
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
    <Paper style={{ padding: 15 }}>
      <Flex gap={20} style={{ overflowX: 'auto', padding: 5 }}>
        {data.map(dc => (
          <Paper width={300} key={`dc-cl-${dc.id}`}>
            <Grid gap={10}>
              <Flex gap={20} justify="space-between" items="center">
                <Text
                  size="lg"
                  weight="500"
                  whiteSpace="nowrap"
                  style={{ maxWidth: 164, overflowX: 'hidden', textOverflow: 'ellipsis' }}
                  title={dc.name}
                >
                  {dc.name}
                </Text>

                <Flex gap={5} justify="end" items="center" style={{ width: 'auto' }}>
                  <IconButton circle size={22} color="amber_500" title="Alertas de reposição" onClick={openModal('supply', dc)}>
                    <AiOutlineAlert size={15} color="white"  title="Alertas de reposição" />
                  </IconButton>

                  <IconButton circle size={22} color="red_600" title="Registrar extravio" onClick={openModal('leave', dc)}>
                    <BiMinus size={20} color="white"  title="Registrar extravio" />
                  </IconButton>
                  
                  {/* <IconButton circle size={22} color="blue_600" title="Histórico" onClick={openModal('leave', dc)}>
                    <AiOutlineHistory size={14} color="white"  title="Histórico" />
                  </IconButton> */}
                </Flex>

              </Flex>

              <Divider line opacityLine={0.15} />

              {dc.stock.sort((a, b) => a.name.localeCompare(b.name)).map(s => (
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