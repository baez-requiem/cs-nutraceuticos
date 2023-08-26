import { FC } from 'react'
import { Button, Buttons, Divider, Fade, Flex, Grid, Input, Modal, Select, Text } from "src/components/ui"
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
    productsOpts,
    addProduct,
    removeProduct,
    formik: {
      values,
      handleChange,
      handleSubmit
    }
  } = useLeaveModal({ show, onClose, data })

  return (
    <Modal show={show} onClose={onClose} maxWidth={500}>
      <Text size="xl" weight="600">Registrar extravio</Text>

      <Divider my={10} />

      <Text weight="600">{data?.name}</Text>

      <Fade.FadeIn show={!!data?.id}>
        <Divider />

        <Text size="sm">Estoque atual</Text>

        <Divider />

        {data?.stock.sort().map(s => (
          <div key={`leave-${data.id}-${s.id}`}>
            <Flex justify='space-between'>
              <Text size="sm">{s.name}</Text>
              <Text size="sm">{s.quantity} {values.products.find(p => p.id_product === s.id && p.quantity) && <Text size="sm" color='red_600'>(-{values.products.find(p => p.id_product === s.id).quantity})</Text>}</Text>
            </Flex>
            <Divider my={2.5} line opacityLine={.1} />
          </div>
        ))}
      </Fade.FadeIn>

      <Divider />

      <form onSubmit={handleSubmit}>
        <Grid gap={10}>
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
                label={'Produto ' + (idx + 1)}
              />

              <Input
                block
                type='number'
                label='Quantidade'
                min={1}
                max={product.max}
                required
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
          <Button size="sm" color="green_600" type="submit">Salvar</Button>
        </Flex>
      </form>
    </Modal>
  )
}

export { LeaveModal }