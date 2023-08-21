import { FC } from 'react'
import { Button, Buttons, Divider, Flex, Grid, Input, Modal, ResumeCard, Select, Switch, Text } from "src/components/ui"
import { DistributionCenterStockType } from 'src/services/api/distributionCenters/distributionCenters.types'
import { useSupplyQuantityNoticeModal } from '../hooks/useSupplyQuantityNoticeModal'

interface SupplyQuantityNoticeModalProps {
  show: boolean
  onClose: () => void
  data?: DistributionCenterStockType
}

const SupplyQuantityNoticeModal: FC<SupplyQuantityNoticeModalProps> = ({
  onClose,
  show,
  data
}) => {

  const {
    formik: {
      values,
      handleChange,
      submitForm
    },
    handleSwitchChange
  } = useSupplyQuantityNoticeModal({ onClose, show, data })

  return (
    <Modal show={show} onClose={onClose} maxWidth={500}>
      <Text size="xl" weight="600">Avisos de reabastecimento</Text>

      <Divider my={10} />

      <Text weight="600">{data?.name}</Text>

      <Divider my={10} />

      <Grid gap={10}>
        {values.supply_quantity_notice.map((sqn, idx) => (
           <Grid template='1fr 100px auto' gap={10} items="end" key={`sqn-${sqn.id_product}`}>
           <Input
             block
             readOnly
             disabled={!sqn.active}
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

      <Divider my={10} />

      <Flex items="end" justify="end" gap={10}>
          <Button size="sm" color="gray_500" type="button" onClick={onClose}>Cancelar</Button>
          <Button size="sm" color="green_600" type="submit" onClick={submitForm}>Salvar</Button>
        </Flex>
    </Modal>
  )
}

export { SupplyQuantityNoticeModal }