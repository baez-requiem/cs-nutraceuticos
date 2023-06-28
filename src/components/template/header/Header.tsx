import { FC } from 'react'
import { BiBell } from 'react-icons/bi'
import { Flex, Text } from "src/components/ui"
import { BellButton, Container } from './styles'
import { Notifications } from './components'

export interface HeaderProps {
  title?: string
}

const Header: FC<HeaderProps> = ({
  title = ''
}) => (
  <Container>
    <Flex items="center" justify="space-between">
      <Text size="xl2" weight="600" color="gray_900">{title}</Text>

      <Flex items="center" justify="end" gap={20}>
        <Notifications />
      </Flex>
    </Flex>

    
  </Container>
)

export default Header