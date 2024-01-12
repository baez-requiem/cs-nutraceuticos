import { FC } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { Badge, Divider, Fade, Grid, IconButton, Modal, Text } from "src/components/ui"
import { useLogisticInfosHistoryModal } from "./hooks/useLogisticInfosHistoryModal"
import { floatToReal } from "src/utils/number.utils"
import { formatDate, formatDateTime } from "src/utils/date.utils"
import { matchColor } from "src/utils/theme"
import { Sale } from "src/services/api/logistic/logistic.types"

export interface LogisticInfosHistoryModalProps {
  show: boolean
  onClose: () => void
  data?: Sale
}

const LogisticInfosHistoryModal: FC<LogisticInfosHistoryModalProps> = ({
  onClose,
  show,
  data
}) => {

  const { infosToShow, toggleShow } = useLogisticInfosHistoryModal({ show })

  return (
    <Modal show={show} onClose={onClose} maxWidth={700}>
      <Text size="xl" weight="600">Histórico logística</Text>

      <Divider my={10} />

      <Grid template="40px 1fr 1fr 1fr" gap={20}>
        <div></div>
        <Text weight="500">Data</Text>
        <Text weight="500" align="center">Status</Text>
        <Text weight="500">Alterada por</Text>
      </Grid>

      <Divider />

      {data?.logistic_infos.map(li => (
        <div key={`logistic-infos-${li.id}`}>
          <Grid template="40px 1fr 1fr 1fr" gap={20}>
            <IconButton onClick={toggleShow(li.id)}>
              {infosToShow.includes(li.id)
                ? <AiOutlineMinus color="black" />
                : <AiOutlinePlus color="black" />
              }
            </IconButton>
            <Text>{formatDateTime(li.created_at)}</Text>
            <Badge block color={matchColor(li.sale_status.color) || 'black'}>{li.sale_status.status}</Badge>
            <Text>{li.user?.name}</Text>
          </Grid>

          <Divider />

          <Fade.FadeIn show={infosToShow.includes(li.id)}>
            <Grid template="1fr 1fr 1fr" gap={20}>
              <div>
                <Text weight="500">Tipo de entrega</Text>
                <br />
                <Text>{li.delivery_type?.name}</Text>
              </div>

              {li.motoboy?.id ? (
                <div>
                  <Text weight="500">Motoboy</Text>
                  <br />
                  <Text>{li.motoboy.name}</Text>
                </div>
              ) : null}

              {li.tracking_code ? (
                <div>
                  <Text weight="500">Código de rastreio</Text>
                  <br />
                  <Text>{li.tracking_code}</Text>
                </div>
              ) : null}

              <div>
                <Text weight="500">Valor da entrega</Text>
                <br />
                <Text>{floatToReal(li.delivery_value)}</Text>
              </div>

              <div>
                <Text weight="500">Data de entrega</Text>
                <br />
                <Text>{formatDate(li.delivery_date)}{li.delivery_time && ` ás ${li.delivery_time}`}</Text>
              </div>
            </Grid>

            <Divider />

            <div>
              <Text weight="500">Anotações</Text>
              <br />
              <Text>{li.notes}</Text>
            </div>
          </Fade.FadeIn>

          <Divider line opacityLine={0.25} />
        </div>
      ))}

    </Modal>
  )
}
export { LogisticInfosHistoryModal }