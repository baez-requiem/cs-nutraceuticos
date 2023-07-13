import styled, { css, keyframes } from "styled-components"

const showMobileAdmin = keyframes`
  from {
    left: -720px;
    opacity: 0;
  }
  to {
    left: 0px;
    opacity: 1;
  }
`

const showSubmenuAnim = keyframes`
  from {
    opacity: 0;
    max-height: 0px;
  }

  66% {
    max-height: 800px;
  }

  to {
    max-height: 800px;
    opacity: 1;
  }
`

export const NavContainer = styled.nav<{ hasMenuHide?: boolean }>`
  color: #fff;

  transition: all .3s;

  min-width: ${({ hasMenuHide }) => hasMenuHide ? '65px' : '275px'};
  width: ${({ hasMenuHide }) => hasMenuHide ? '65px' : '275px'};
  
  height: 100vh;

  background-color: #082f49;

  display: flex;
  flex-direction: column;

  ${({ hasMenuHide }) => hasMenuHide && css`
    li > span {
      display: none;
    }

    .hide-none {
      display: none !important;
    }

    .hide-justify-center {
      justify-content: center;
    }
  `}

  @media (${({ theme }) => theme.device.sm}) {
    position: absolute;
    top: 0px;
    width: 100vw;
    z-index: 10;

    ${({ hasMenuHide }) => hasMenuHide ? css`
      animation: ${showMobileAdmin} .75s linear reverse;
      left: -720px;
      opacity: 0;
    ` : css`
      animation: ${showMobileAdmin} .75s linear;
      left: 0px;
      opacity: 1;
    `}

  }
`

export const NavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 72px;

  padding: 16px 20px;
`

export const NavLogo = styled.div.attrs({
  className: 'hide-none'
})`
  height: 40px;
  width: 130px;

  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  font-weight: 900;

  p:first-child {
    font-size: 22px;
  }
`

export const MenuButton = styled.button`
  height: 40px;
  width: 40px;

  border: none;
  border-radius: 20px;

  background-color: transparent;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: all .2s;

  :hover {
    background-color: #fff1;
    box-shadow: 0px 0px 5px 5px #fff1;
  }
`

export const UserContent = styled.div<{ hasMenuHide?: boolean }>`
  span {
    display: inline-block;
    padding: 16px 20px;
  }


  ${({ hasMenuHide }) => hasMenuHide && css`
    span { 
      display: none;
    }
  `}
`

export const MenuContent = styled.ul`
  margin: 0px;

  display: flex;
  flex-direction: column;

  list-style: none;
`

export const MenuItem = styled.li<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 12px 20px;

  span {
    font-size: 16px;
    font-weight: 500;
  }

  cursor: pointer;
  transition: all .3s;

  ${({ active }) => active ? css`
    background-color: #ffffff20;

    cursor: unset;
  ` : css`
    :hover {
      background-color: #ffffff10;
      box-shadow: 0px 0px 5px 5px #ffffff05;
    }
  `}
`

export const SubMenu = styled.li<{ active?: boolean, hasMenuHide?: boolean }>`
  padding: 12px 20px;

  ${({ active }) => active && css`
    background-color: #00000020;
  `}
  
  > div:first-child {
    display: flex;
    align-items: center;
    gap: 12px;

    span {
      display: ${({ hasMenuHide }) => hasMenuHide ? 'none' : 'inline'};

      font-size: 16px;
      font-weight: 500;
    }
  }

  > div:last-child {
    display: ${({ hasMenuHide }) => hasMenuHide ? 'none' : 'block'};

    padding-top: 10px;

    overflow-y: hidden;
    transition: all .4s;

    max-height: 0px;

    ${({ active }) => active && css`
      max-height: 1000px;
    `}
  }

  > ul {
    display: flex;
    flex-direction: column;
  }

  cursor: pointer;
  transition: all .3s;
`

export const SubMenuItem = styled.li<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 8px 3px;

  transition: all .3s;

  ${({ active }) => active ? css`
    background-color: #ffffff20;

    cursor: unset;
  ` : css`
    :hover {
      background-color: #ffffff10;
      box-shadow: 0px 0px 5px 5px #ffffff05;
    }
  `}
`

export const ExitItem = styled(MenuItem)`
  margin-top: auto;
  border-top: 1px solid rgb(63 63 70 / 0.8);
`

export const StyledSpan = styled.span.attrs({
  className: 'hide-none'
})`
`