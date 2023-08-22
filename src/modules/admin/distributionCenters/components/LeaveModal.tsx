import { FC } from 'react'
import { Button, Buttons, Divider, Flex, Grid, Input, Modal, Select, Text } from "src/components/ui"
import { useLeaveModal } from '../hooks/useLeaveModal'
import { DistributionCenterStockType } from 'src/services/api/distributionCenters/distributionCenters.types'

interface LeaveModalProps {
  show: boolean
  onClose: () => void
  data?: DistributionCenterStockType
}

const LeaveModal: FC<LeaveModalProps> = ({
  onClose,
  show,
  data
}) => {

  const {
    distributionCentersOpts,
    productsOpts,
    addProduct,
    removeProduct,
    formik: {
      values,
      handleChange,
      submitForm
    }
  } = useLeaveModal({ show, onClose, data })

  return (
    <Modal show={show} onClose={onClose} maxWidth={500}>
      <Text size="xl" weight="600">Registrar saída</Text>

      <Divider my={10} />

      <Grid gap={10}>
        <Select
          name='distribution_center'
          label='Centro de distribuição'
          options={distributionCentersOpts}
          value={values.distribution_center}
          onChange={handleChange}
        />

        <Flex gap={10} items='end'>
          <Select
            label='Selecione um produto...'
            options={productsOpts()}
            name='product'
            value={values.product}
            onChange={handleChange}
            block
          />

          <Buttons.Plus disabled={!values.product} onClick={addProduct} />
        </Flex>

        {values.products.map((product, idx) => (
          <Grid gap={10} template='1fr 100px auto' items='end' key={`entry-modal-product-${product.id_product}`}>
            <Input
              block
              disabled
              value={product.name}
              label={'Produto ' + idx}
            />

            <Input
              block
              type='number'
              label='Quantidade'
              name={`products.${idx}.quantity`}
              onChange={handleChange}
              value={product.quantity}
            />

            <Buttons.Times onClick={removeProduct(product.id_product)} />
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

export { LeaveModal }