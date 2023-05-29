import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from '..'
import { Container, Content } from './styles'

import { menuItems } from './constans'

const SellerLayout: FC = () => (
  <Container>
    <Menu menuItems={menuItems} />
    <Content>
      <Outlet />
    </Content>
  </Container>
)


export default SellerLayout