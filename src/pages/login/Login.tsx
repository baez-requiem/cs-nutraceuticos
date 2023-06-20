import Input from "./components/Input"
import { Container, Content, FormContent, Logo, StyledButton } from "./styles"

import { BiUser, BiLock } from 'react-icons/bi'
import { useLogin } from "./hooks/useLogin"

const Login = () => {

  const {
    formik: {
      handleChange,
      values,
      handleSubmit
    },
    mutation
  } = useLogin()

  return (
    <Container>
      <Content>
        <Logo>
          <div />
          <div />
          <div />
          <div />
        </Logo>

        <FormContent onSubmit={handleSubmit}>
          <Input
            icon={<BiUser size={20} color="white" />}
            placeholder="Usuário"
            name="username"
            value={values.username}
            onChange={handleChange}
          />

          <Input
            icon={<BiLock size={20} color="white" />}
            type="password"
            name="password"
            placeholder="Senha"
            value={values.password}
            onChange={handleChange}
          />

          <StyledButton type="submit" disabled={mutation.isLoading}>Entrar</StyledButton>
        </FormContent>
      </Content>
    </Container>
  )
}

export default Login