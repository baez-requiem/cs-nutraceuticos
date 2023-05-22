import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  width: 100vw;
`

export const Content = styled.div`
  width: 100%;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.gray_100};

  padding: 20px;

  overflow-y: auto;
`