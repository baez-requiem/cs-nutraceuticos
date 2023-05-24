
import styled, { keyframes } from "styled-components"

const openAnim = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`
const closeAnim = keyframes`
  from { opacity: 1 }
  to { opacity: 0 }
`

interface OverlayProps {
  show: boolean
}

export const Overlay = styled.div<OverlayProps>`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, .9);
  animation: .3s linear 0s ${({ show }) => show ? openAnim : closeAnim} forwards;
`

export const Container = styled.div<{ maxWidth?: number }>`
  position: relative;
  
  min-width: 300px;
  max-width: ${({ maxWidth = 1200 }) => maxWidth}px;
  width: 85%;
  padding: 25px;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.bg_color};
  box-shadow: 0px 0px 5px 2px ${({ theme }) => theme.mode === 'dark' ? '#fff2' : '#0002'};
  
  transition: all .5s;

  max-height: 90%;
  overflow-y: auto;

  @media (${({ theme }) => theme.device.sm}) {
    width: 95%;
    max-height: calc(100vh - 30px);
  }
`

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  
  height: 40px;
  width: 40px;
  
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 50%;

  color: ${({ theme }) => theme.colors.text};
  
  background-color: transparent;

  cursor: pointer;
  transition: all .3s;
  &:hover {
    box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.text}30;
  }
`