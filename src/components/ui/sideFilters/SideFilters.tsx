import { FC, ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'
import { BsChevronRight } from 'react-icons/bs'
import { Button, Flex, IconButton, Text } from '..'
import { Container, Content, Footer, Header } from './sideFilters.styles'

export interface SideFiltersProps {
  children: ReactNode | ReactNode[]
  onClose?: () => void
  onFilter?: () => void
  onReset?: () => void
}

const SideFilters: FC<SideFiltersProps> = ({
  children,
  onFilter,
  onReset,
}) => {

  const [show, setShow] = useState(false)

  return (
    <>
      <Button color='sky_800' size='sm' onClick={() => setShow(true)}>Filtros</Button>

      {createPortal(
        <Container show={show}>
          <Header>
            <Text size='xl'>Filtros</Text>
            <IconButton onClick={() => setShow(false)}>
              <BsChevronRight size={18} />
            </IconButton>
          </Header>
          <Content>
            {children}
          </Content>
          <Footer>
            <Flex gap={20}>
            {onReset && <Button color='blue_800' block onClick={onReset}>Redefinir</Button>}
            <Button color='sky_800' block onClick={onFilter}>Filtrar</Button>
            </Flex>
          </Footer>
        </Container>
      , document.body)}
    </>
  )
}



export default SideFilters