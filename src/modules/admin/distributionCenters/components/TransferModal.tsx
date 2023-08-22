import { FC } from 'react'
import { Button, Buttons, Divider, Fade, Flex, Grid, Input, Modal, Select, Text } from "src/components/ui"
import { useTransferModal } from '../hooks/useTransferModal'
import { DistributionCenterStockType } from 'src/services/api/distributionCenters/distributionCenters.types'
import { makeSelectOpts } from 'src/utils/form.utils'

interface TransferModalProps {
  show: boolean
  onClose: () => void
  data: DistributionCenterStockType[]
}

const TransferModal: FC<TransferModalProps> = ({
  onClose,
  show,
  data
}) => {

  const {
    distributionCentersOpts,
    addProduct,
    removeProduct,
    productsOpts,
    formik: {
      values,
      handleChange,
      submitForm,
      handleSubmit
    }
  } = useTransferModal({ show, onClose, data })

  return (
    <Modal show={show} onClose={onClose} maxWidth={500}>
      <Text size="xl" weight="600">Registrar tranferência</Text>

      <Divider my={10} />

      <form onSubmit={handleSubmit}>
        <Grid gap={20} template='1fr 1fr'>
          <div>
            <Select
              label='De:'
              name='id_distribution_center_from'
              options={distributionCentersOpts}
              value={values.id_distribution_center_from}
              onChange={handleChange}
              required
            />

            <Fade.FadeIn show={!!values.id_distribution_center_from}>
              <Divider />

              <Text size="sm">Estoque atual</Text>

              <Divider />

              {!!values.id_distribution_center_from && data.find(dc => dc.id === values.id_distribution_center_from)?.stock.sort().map(s => (
                <div key={`transfer-${values.id_distribution_center_from}-${s.id}`}>
                  <Flex justify='space-between'>
                    <Text size="sm">{s.name}</Text>
                    <Text size="sm">{s.quantity} {values.products.find(p => p.id_product === s.id && p.quantity) && <Text size="sm" color='red_600'>(-{values.products.find(p => p.id_product === s.id).quantity})</Text>}</Text>
                  </Flex>
                  <Divider my={2.5} line opacityLine={.1} />
                </div>
              ))}
            </Fade.FadeIn>
          </div>

          <div>
            <Select
              name='id_distribution_center_to'
              label='Para:'
              options={distributionCentersOpts}
              value={values.id_distribution_center_to}
              onChange={handleChange}
              required
            />

            <Fade.FadeIn show={!!values.id_distribution_center_to}>
              <Divider />

              <Text size="sm">Estoque atual</Text>

              <Divider />

              {!!values.id_distribution_center_to && data.find(dc => dc.id === values.id_distribution_center_to)?.stock.sort().map(s => (
                <div key={`transfer-${values.id_distribution_center_to}-${s.id}`}>
                  <Flex justify='space-between'>
                    <Text size="sm">{s.name}</Text>
                    <Text size="sm">{s.quantity} {values.products.find(p => p.id_product === s.id && p.quantity) && <Text size="sm" color='green_600'>(+{values.products.find(p => p.id_product === s.id).quantity})</Text>}</Text>
                  </Flex>
                  <Divider my={2.5} line opacityLine={.1} />
                </div>
              ))}
            </Fade.FadeIn>
          </div>

        </Grid>

        <Divider />

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
                min={1}
                max={product.max}
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
          <Button size="sm" color="green_600" type="submit">Salvar</Button>
        </Flex>
      </form>

    </Modal>
  )
}

export { TransferModal }