import Input from "./components/Input"
import { Container, Content, FormContent, Logo, StyledButton } from "./styles"

import { BiUser, BiLock } from 'react-icons/bi'

const Login = () => {

  return (
    <Container>
      <Content>
        <Logo>
          <div />
          <div />
          <div />
          <div />
        </Logo>

        <FormContent>
          <Input
            icon={<BiUser size={20} color="white" />}
            placeholder="Usuário"
          />

          <Input
            icon={<BiLock size={20} color="white" />}
            type="password"
            placeholder="Senha"
          />

          <StyledButton>Entrar</StyledButton>
        </FormContent>
      </Content>
    </Container>
  )
}

export default Login