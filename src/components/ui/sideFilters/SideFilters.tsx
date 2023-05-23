import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { BsChevronRight } from 'react-icons/bs'
import { Button, IconButton, Text } from '..'
import { Container, Content, Footer, Header } from './sideFilters.styles'

export interface SideFiltersProps {
  children: ReactNode | ReactNode[]
  show?: boolean
  onClose?: () => void
  onFilter?: () => void
}

const SideFilters: FC<SideFiltersProps> = ({
  children,
  onFilter,
  onClose,
  show,
}) => {

  createPortal(
    <Container show={show}>
      <Header>
        <Text size='xl'>Filtros</Text>
        <IconButton onClick={() => onClose?.()}>
          <BsChevronRight size={18} />
        </IconButton>
      </Header>
      <Content>
        {children}
      </Content>
      <Footer>
        <Button color='sky_800' block onClick={onFilter}>Filtrar</Button>
      </Footer>
    </Container>
    , document.body)

  return (
    <div>oi</div>
  )
}



export default SideFilters