import { FC } from 'react'
import { createPortal } from 'react-dom'
import { CloseButton, Container, Overlay } from './styles'
import { IoMdClose } from 'react-icons/io'
import { useModal } from './hooks/useModal'

export interface ModalProps {
  show: boolean
  maxWidth?: number
  children: React.ReactNode
  onClose: (arg0:any) => any
}

const Modal: FC<ModalProps> = ({ children, onClose, show, maxWidth }) => {

  const { hasShow } = useModal(show)

  return hasShow ? createPortal(
    <Overlay show={show}>
      <Container maxWidth={maxWidth}>
        <CloseButton onClick={onClose}>
          <IoMdClose size={30} />
        </CloseButton>
        {children}
      </Container>
    </Overlay>
  , document.body)
  : null
}

export default Modal