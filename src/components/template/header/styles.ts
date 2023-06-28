import styled, { css, keyframes } from "styled-components"

export const pulseAnim = keyframes`
  0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 #f59e0b90;
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px #f59e0b00;
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 #f59e0b00;
	}
`

export const Container = styled.div`
  position: relative;
`

export const BellButton = styled.button<{ hasNotifications?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;

  border: none;
  border-radius: 50%;

  cursor: pointer;

  transition: all .3s;

  ${({ hasNotifications, theme }) => hasNotifications && css`
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
    transform: scale(1);
    animation: ${pulseAnim} 2s infinite;
    
    background-color: ${theme.colors.amber_500};
    color: white;
  `}

  :hover {
    :first-child {
      transform: scale(1.1);
    }
  }
`

export const NotificationsContent = styled.div<{ show: boolean }>`
  position: absolute;
  top: 40px;
  right: 0px;

  width: 280px;

  background-color: ${({ theme }) => theme.colors.bg_color};

  display: ${({ show }) => show ? 'block' : 'none'};

  padding: 10px;
  border-radius: 5px;

  box-shadow: -1px 2px 2px 2px #0002;
`

export const NotifyLowStock = styled.div`
  padding: 10px;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.amber_500};

  cursor: pointer;
`