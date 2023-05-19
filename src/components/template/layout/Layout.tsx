import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from '..'
import { Container, Content } from './styles'

const Layout: FC = () => (
  <Container>
    <Menu />
    <Content>
      <Outlet />
    </Content>
  </Container>
)


export default Layout