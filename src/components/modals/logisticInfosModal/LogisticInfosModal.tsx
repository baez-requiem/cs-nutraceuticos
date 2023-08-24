import { FC } from "react"
import { Button, Divider, Fade, Flex, Grid, Input, Modal, Select, Text, Textarea } from "src/components/ui"
import { formatDateTime } from "src/utils/date.utils"
import { mapSaleProductsLogistic, totalSaleValue } from "./utils/mappers"
import { floatToReal } from "src/utils/number.utils"
import { useLogisticInfosModal } from "./hooks/useLogisticInfosModal"
import { handleChangeFormatReal } from "src/utils/form.utils"
import { Sale } from "src/services/api/logistic/logistic.types"

export interface LogisticInfosModalProps {
  show: boolean
  onClose: () => void
  data?: Sale
}

const LogisticInfosModal: FC<LogisticInfosModalProps> = ({
  onClose,
  show,
  data
}) => {

  const {
    saleStatus,
    deliveryTypes,
    motoboys,
    formik: {
      values,
      handleChange,
      handleSubmit,
      setFieldValue
    }
  } = useLogisticInfosModal({ show, onClose, data })

  return (
    <Modal show={show} onClose={onClose} maxWidth={700}>
      <Text size="xl" weight="600">Logística da venda</Text>

      <Divider my={10} />

      <Text weight="500">Resumo da venda</Text>
      <Divider />

      <Grid gap={20} template="1fr 1fr" sm="1fr">
        <Flex justify="space-between">
          <Text>Data da venda:</Text>
          <Text size="sm">{formatDateTime(data?.created_at)}</Text>
        </Flex>

        <Flex justify="space-between" items="center">
          <Text>Vendedor:</Text>
          <Text size="sm">{data?.user.name}</Text>
        </Flex>

        <Flex justify="space-between" items="center">
          <Text>Desconto:</Text>
          <Text size="sm">{floatToReal(data?.discounts)}</Text>
        </Flex>

        <Flex justify="space-between" items="center">
          <Text>Total:</Text>
          <Text size="sm">{floatToReal(totalSaleValue(data, true))}</Text>
        </Flex>
      </Grid>

      <Divider my={10} line opacityLine={0.15} />

      <Grid gap={10} template="2fr 1fr 1fr">
        <Text size="sm" weight="500">Produtos</Text>
        <Text size="sm" weight="500" align="right">Qntd. / Valor und.</Text>
        <Text size="sm" weight="500" align="right">Total</Text>
      </Grid>

      <Divider />

      {mapSaleProductsLogistic(data?.sale_products || []).map(sp => (
        <Grid gap={10} template="2fr 1fr 1fr" key={`sp-l-${sp.name}`}>
          <Text size="sm">{sp.name}</Text>
          <Text size="sm" align="right">{sp.quantity}x {floatToReal(sp.unit_value)}</Text>
          <Text size="sm" align="right">{floatToReal(sp.total)}</Text>
        </Grid>
      ))}

      <Divider />

      <Grid gap={10} template="2fr 1fr 1fr">
        <div></div>
        <div></div>
        <Text size="sm" align="right">{floatToReal(totalSaleValue(data))}</Text>
      </Grid>

      <Divider my={10} line opacityLine={0.15} />

      <Grid gap={10} template="1fr 1fr 1fr" sm="1fr">
        <Grid>
          <Text>CEP:</Text>
          <Text size="sm">{data?.cep}</Text>
        </Grid>

        <Grid items="center">
          <Text>Estado:</Text>
          <Text size="sm">{data?.state}</Text>
        </Grid>

        <Grid items="center">
          <Text>Cidade:</Text>
          <Text size="sm">{data?.city}</Text>
        </Grid>

        <Grid items="center">
          <Text>Bairro:</Text>
          <Text size="sm">{data?.neighborhood}</Text>
        </Grid>

        <Grid items="center">
          <Text>Endereço:</Text>
          <Text size="sm">{data?.address}</Text>
        </Grid>

        <Grid items="center">
          <Text>Complemento:</Text>
          <Text size="sm">{data?.complement}</Text>
        </Grid>
      </Grid>

      <Divider my={10} />

      <form onSubmit={handleSubmit}>
        <Text weight="500">Dados da venda</Text>
        <Divider />

        <Grid gap={10} template="1fr 1fr" md="1fr">
          <Select
            label="Status"
            name="id_sale_status"
            options={saleStatus.map(status => ({ label: status.status, value: status.id }))}
            onChange={handleChange}
            value={values.id_sale_status}
            labelFixed={!!values.id_sale_status}
          />
        </Grid>

        <Divider my={10} />

        <Text weight="500">Dados da entrega</Text>
        <Divider />
        <Grid gap={10} template="1fr 1fr" md="1fr">
          <Select
            nullable
            label="Tipo de entrega:"
            name="id_delivery_type"
            value={values.id_delivery_type}
            options={deliveryTypes.map(deliveryType => ({ label: deliveryType.name, value: deliveryType.id }))}
            onChange={handleChange}
            labelFixed={!!values.id_delivery_type}
          />

          <Input
            label="Data de entrega:"
            name="delivery_date"
            type="date"
            value={values.delivery_date}
            onChange={handleChange}
            labelFixed={!!values.delivery_date}
          />

          <Fade.FadeIn show={!!values.id_delivery_type}>
            {values.id_delivery_type === 'motoboy' && (
              <Select
                nullable
                label="Motoboy:"
                name="id_motoboy"
                options={motoboys.map(motoboy => ({ label: motoboy.name, value: motoboy.id }))}
                value={values.id_motoboy}
                onChange={handleChange}
                labelFixed={!!values.id_motoboy}
              />
            )}
            {values.id_delivery_type === 'correios' && (
              <Input
                label="Código de rastreio:"
                name="tracking_code"
                value={values.tracking_code}
                onChange={handleChange}
                labelFixed={!!values.tracking_code}
              />
            )}
          </Fade.FadeIn>

          <Input
            label="Valor da entrega:"
            name="delivery_value"
            value={values.delivery_value}
            onChange={handleChangeFormatReal(setFieldValue)}
            labelFixed={!!values.delivery_value}
          />

        </Grid>
        <Divider />
        <Textarea
          rows={7}
          name="notes"
          label="Anotações da entrega:"
          value={values.notes}
          onChange={handleChange}
          labelFixed={!!values.notes}
        />

        <Divider my={10} />

        <Flex items="end" justify="end" gap={10}>
          <Button size="sm" color="gray_500" type="button" onClick={onClose}>Cancelar</Button>
          <Button size="sm" color="green_600" type="submit">Salvar</Button>
        </Flex>
      </form>
    </Modal>
  )
}
export { LogisticInfosModal }