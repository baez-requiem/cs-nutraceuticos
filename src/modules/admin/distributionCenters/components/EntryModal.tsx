import { FC } from 'react'
import { Buttons, Divider, Flex, Grid, Input, Modal, Select, Text } from "src/components/ui"
import { useEntryModal } from '../hooks/useEntryModal'

interface EntryModalProps {
  show: boolean
  onClose: () => void
}

const EntryModal: FC<EntryModalProps> = ({
  onClose,
  show
}) => {

  const {
    distributionCentersOpts,
    productsOpts,
    formik: {
      values,
      handleChange
    }
  } = useEntryModal()

  return (
    <Modal show={show} onClose={onClose} maxWidth={500}>
      <Text size="xl" weight="600">Registrar entrada</Text>

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
            options={productsOpts}
            block
          />

          <Buttons.Plus />
        </Flex>

        {values.products.map((product, idx) => (
          <Grid gap={20} template='1fr 100px auto' items='end' key={`entry-modal-product-${product.id_product}`}>
            <Input
              block
              disabled
              value={product.name}
              label='Produto 1'
            />

            <Input
              block
              type='number'
              label='Quantidade'
              name={`products.${idx}.quantity`}
              value={product.quantity}
            />

            <Buttons.Times />
          </Grid>
        ))}

      </Grid>
      
    </Modal>
  )
}

export { EntryModal }