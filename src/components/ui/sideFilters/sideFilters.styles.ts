import styled, { css } from "styled-components"

export const Container = styled.div<{ show?: boolean }>`
  transition: all .3s;
  position: fixed;
  right: -320px;
  top: 0px;

  opacity: 0;

  width: 300px;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.bg_color };
  box-shadow: 0px 0px 5px 5px ${({ theme }) => theme.mode == 'dark' ? '#0007' : '#0002'};

  ${({ show }) => show && css`
    right: 0px;
    opacity: 1;
  `}
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 73px;

  padding: 0 12.5px 0 20px;

  border-bottom: 1px solid ${({ theme }) => theme.mode == 'dark' ? '#555' : '#ccc'};

  color: ${({ theme }) => theme.colors.text};
`

export const Content = styled.div`
  padding: 20px;
  height: calc(100vh - 74px - 80px);
  overflow-y: auto;
`

export const Footer = styled.div`
  padding: 20px;
`