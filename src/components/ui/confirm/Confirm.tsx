import { FC } from "react"
import { Button, Divider, Flex, Modal, Text } from "../"

export interface ConfirmProps {
  show?: boolean
  title?: string
  description?: string
  onConfirm: (arg0?: boolean) => void
  onClose: () => void
}

const Confirm: FC<ConfirmProps> = ({
  title = '',
  description = '',
  show = false,
  onConfirm,
  onClose
}) => {

  const close = () => onClose()

  return (
    <Modal
      show={show}
      onClose={close}
      maxWidth={600}
    >
      <Text size="xl" weight="600" color="primary">{title}</Text>

      {description ? (
        <>
          <Divider my={10} />
          <Text size="lg">{description}</Text>
        </>
      ) : null}

      <Divider my={10} />

      <Flex items="end" justify="end" gap={10}>
        <Button size="sm" color="gray_500" onClick={close}>Cancelar</Button>
        <Button size="sm" color="blue_600" onClick={() => onConfirm(true)}>Confirmar</Button>
      </Flex>
    </Modal>
  )
}

export default Confirm