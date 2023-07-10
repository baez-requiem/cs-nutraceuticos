import { FC } from 'react'
import { BiBell } from 'react-icons/bi'
import { Flex, IconButton, Text } from "src/components/ui"
import { BellButton, Container, MenuButton } from './styles'
import { Notifications } from './components'
import { FiMenu } from 'react-icons/fi'
import { useHeader } from './hooks/useHeader'

export interface HeaderProps {
  title?: string
}

const Header: FC<HeaderProps> = ({
  title = ''
}) => {

  const { openMenu, isMobile } = useHeader()

  return (
    <Container>


      <Flex items="center" justify="space-between">
        <Text size="xl2" weight="600" color="gray_900">{title}</Text>

        <Flex items="center" justify="end" gap={10}>
          <Notifications />

          {isMobile ? (
            <IconButton color='blue_500' circle onClick={openMenu}>
              <FiMenu size={20} color='white' />
            </IconButton>
          ) : null}

        </Flex>
      </Flex>


    </Container>
  )
}


export default Header