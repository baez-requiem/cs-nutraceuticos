import { FC } from "react"
import { Divider, Fade, Flex, Grid, Input, Modal, Select, Text, Textarea } from "src/components/ui"
import { formatDateTime } from "src/utils/date.utils"
import { mapSaleProductsLogistic, totalSaleValue } from "../utils"
import { floatToReal } from "src/utils/number.utils"
import { useModalLogisticInfos } from "../hooks/useModalLogisticInfos"

export interface ModalLogisticInfosProps {
  show: boolean
  onClose: () => void
  data?: Sale
}

const ModalLogisticInfos: FC<ModalLogisticInfosProps> = ({
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
      handleChange
    }
  } = useModalLogisticInfos({ show })

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

      {mapSaleProductsLogistic(data?.sale_products).map(sp => (
        <Grid gap={10} template="2fr 1fr 1fr">
          <Text size="sm">{sp.name}</Text>
          <Text size="sm" align="right">{sp.quantity}x {floatToReal(sp.unit_value)}</Text>
          <Text size="sm" align="right">{floatToReal(sp.total)}</Text>
        </Grid>
      ))}

      <Divider />

      <Grid gap={10} template="2fr 1fr 1fr">
        <div></div>
        <div></div>
        <Text size="sm" align="right">{totalSaleValue(data)}</Text>
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

      <form>
        <Text weight="500">Dados da venda</Text>
        <Divider />

        <Grid gap={10} template="1fr 1fr" md="1fr">
          <Select
            label="Status"
            name="id_sale_status"
            options={saleStatus.map(status => ({ label: status.status, value: status.id }))}
            onChange={handleChange}
          />
        </Grid>

        <Divider my={10} />

        <Text weight="500">Dados da entrega</Text>
        <Divider />
        <Grid gap={10} template="1fr 1fr" md="1fr">
          <Select
            nullable
            label="Tipo de entrega:"
            name="delivery_type"
            options={deliveryTypes.map(deliveryType => ({ label: deliveryType.name, value: deliveryType.id }))}
            onChange={handleChange}
          />

          <Input
            label="Data de entrega:"
            name="delivery_date"
            type="date"
            value={values.delivery_date}
            onChange={handleChange}
          />
          
          <Fade.FadeIn show={values.delivery_type == 'motoboy'}>
            <Select
              nullable
              label="Motoboy:"
              name="motoboy"
              options={motoboys.map(motoboy => ({ label: motoboy.name, value: motoboy.id }))}
              value={values.motoboy}
              onChange={handleChange}
            />
          </Fade.FadeIn>
          
        </Grid>
        <Divider />
        <Textarea
          rows={7}
          name="notes"
          label="Anotações da entrega:"
          value={values.notes}
          onChange={handleChange}
        />
      </form>
    </Modal>
  )
}
export default ModalLogisticInfos