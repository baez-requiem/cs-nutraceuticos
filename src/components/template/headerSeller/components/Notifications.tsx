import { Flex, Text } from "src/components/ui"
import { BellButton, NotificationsContent, NotifyLowStock } from "../styles"
import { BiBell } from "react-icons/bi"
import { useNotifications } from "../hooks/useNotifications"
import { useNavigate } from "react-router-dom"

const Notifications = () => {

  const {
    hasLowStockProduct,
    hasNotifications,
    close,
    show,
    toggle
  } = useNotifications()

  const navigate = useNavigate()

  return (
    <>
      <BellButton hasNotifications={hasNotifications} onClick={toggle}>
        <BiBell size={20} />
      </BellButton>

      <NotificationsContent show={show} onMouseLeave={close}>

        {!hasNotifications ? (
          <Flex justify="center">
            <Text>Não há nenhuma notificação.</Text>
          </Flex>
        ) : null}

        {hasLowStockProduct ? (
          <NotifyLowStock onClick={() => navigate('/admin/stock')}>
            <Text>Há <Text color="amber_500" weight="700">{hasLowStockProduct}</Text> produto{hasLowStockProduct > 1 ? 's' : ''} abaixo do estoque mínimo.</Text>
          </NotifyLowStock>
        ) : null}
      </NotificationsContent>
    </>
  )
}

export default Notifications