import { FC } from 'react'
import { Buttons, Divider, Flex, Grid, Input, Modal, ResumeCard, Select, Switch, Text } from "src/components/ui"
import { useDistributionCenterModal } from '../hooks/useDistributionCenterModal'


interface DistributionCenterModalProps {
  show: boolean
  onClose: () => void
}

const DistributionCenterModal: FC<DistributionCenterModalProps> = ({
  onClose,
  show
}) => {

  const {
    products,
    handleSwitchChange,
    formik: {
      values,
      handleChange
    }
  } = useDistributionCenterModal()

  return (
    <Modal show={show} onClose={onClose} maxWidth={500}>
      <Text size="xl" weight="600">Motoboy CD</Text>

      <Divider my={10} />

      <Text weight="600">Estoque</Text>
      <Divider my={10} />

      <Grid gap={10} style={{ maxHeight: 400, overflowY: 'auto', paddingRight: 10 }}>
        {products.map(p => (
          <div>
            <Flex justify='space-between'>
              <Text>{p.name}</Text>
              <Text>14</Text>
            </Flex>
            <Divider mb={0} mt={10} line opacityLine={0.1} />
          </div>
        ))}
      </Grid>

      <Divider my={10} />

      <Text weight="600">Alertas de reabastecimento</Text>
      <Divider my={10} />

      <Grid gap={10}>
        {values.supply_quantity_notice.map((sqn, idx) => (
          <Grid template='1fr 100px auto' gap={10} items="start" key={`dc-${'id'}-sqn-${sqn.id_product}`}>
            <Input
              block
              disabled
              label='Produto'
              value={sqn.name}
            />

            <Input
              block
              type='number'
              label='Qntd. min.'
              min={0}
              name={`supply_quantity_notice.${idx}.quantity`}
              disabled={!sqn.active}
              labelFixed={sqn.active}
              onChange={handleChange}
              value={sqn.active ? sqn.quantity : ''}
            />

            <Flex style={{ paddingTop: 22 }}>
              <Switch
                name={`supply_quantity_notice.${idx}.active`}
                onChange={handleSwitchChange}
                checked={sqn.active}
                value={idx}
              />
            </Flex>
          </Grid>
        ))}
      </Grid>

    </Modal>
  )
}

export { DistributionCenterModal }