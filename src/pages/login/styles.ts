import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.primary};
`

export const Content = styled.div`
  height: auto;
  width: 100%;
  max-width: 360px;
  min-width: 300px;
  
  background-color: #0006;
  border-radius: 5px;
  padding: 20px;
`

export const Logo = styled.div`
  height: 100px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 20px;

  div {
    border-radius: 100px 2.5px;
    background-color: ${({ theme }) => theme.colors.secondary};

    height: 30px;
    width: 30px;

    position: absolute;

    :nth-child(1) {
      transform: rotate(-45deg);
      top: 10px;
    }

    :nth-child(2) {
      transform: rotate(45deg);
      left: calc(50% - 45px);
    }

    :nth-child(3) {
      transform: rotate(-45deg);
      bottom: 10px;
    }

    :nth-child(4) {
      transform: rotate(45deg);
      right: calc(50% - 45px);
    }
  }
`

export const FormContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const InputContainer = styled.div`
  height: 40px;
  width: 100%;
  
  display: flex;
  gap: 5px;

  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.sky_800};

  > div {
    height: 100%;
    width: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.colors.sky_800};
  }

  input {
    width: 100%;
    height: 100;

    background-color: transparent;
    padding: 0 5px;
    border: none;

    color: #fff;

    ::placeholder {
      color: #ccc9;
    }

    ::-ms-reveal {
      filter: invert(100%);
    }
  }
`

export const StyledButton = styled.button`
  height: 40px;

  border-radius: 5px;
  border: none;

  background-color: ${({ theme }) => theme.colors.sky_600};

  font-weight: 500;
  letter-spacing: 1px;
  color: #Fff;

  transition: all .3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.sky_700};
    box-shadow: 0px 0px 2px ${({ theme }) => theme.colors.sky_400};
  }
`