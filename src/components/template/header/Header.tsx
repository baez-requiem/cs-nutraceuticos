import { FC } from 'react'
import { Flex, IconButton, Text } from "src/components/ui"
import { Container } from './styles'
import { FiMenu } from 'react-icons/fi'
import { useHeader } from './hooks/useHeader'
import { HiChevronRight } from 'react-icons/hi2'

export interface HeaderProps {
  title?: string
  subtitle?: string
}

const Header: FC<HeaderProps> = ({
  title = '',
  subtitle = ''
}) => {

  const { openMenu, isMobile } = useHeader()

  return (
    <Container>

      <Flex items="center" justify="space-between">
        {subtitle ? (
          <Flex gap={10} items='center'>
            <Text size="md" weight="600" color="gray_700">{subtitle}</Text>
            <HiChevronRight size={12} />
            <Text size="xl2" weight="600" color="gray_900">{title}</Text>
          </Flex>

        ) : (
          <Text size="xl2" weight="600" color="gray_900" whiteSpace='nowrap'>{title}</Text>
        )}

        <Flex items="center" justify="end" gap={10}>
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