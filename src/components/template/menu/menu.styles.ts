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

  color: ${({ theme }) => theme.colors.secondary };
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

// export const MenuItem = styled.li.attrs({
//   className: 'hide-justify-center'
// })<{ active?: boolean }>`
//   > span, > div {
//     font-size: 16px;
//     padding: 8px 20px;

//     border-radius: 5px;
    
//     display: flex;
//     align-items: center;
//     gap: 12px;
    
//     cursor: pointer;
//     transition: all .3s;
  
//     ${({ active }) => active ? css`
//       background-color: #ffffff20;

//       * {
//         color: #fff !important;
//         font-weight: 500;
//       }

//       cursor: unset;
//     ` : css`
//       :hover {
//         background-color: #ffffff10;
//         box-shadow: 0px 0px 5px 5px #ffffff05;
//       }
//     `}
//   }
// `

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

export const ExitItem = styled(MenuItem)`
  margin-top: auto;
  border-top: 1px solid rgb(63 63 70 / 0.8);

  /* display: flex;
  align-items: center;
  gap: 12px; */
`

// export const SubMenu = styled(MenuContent).attrs({
//   className: 'hide-none'
// })<{ show?: boolean }>`
//   display: ${({ show }) => show ? 'flex' : 'none'};
//   flex-direction: column;
//   gap: 4px;

//   position: relative;

//   transition: all .5s;

//   padding-left: 45px;
//   padding-right: 20px;
//   padding-bottom: 10px;

//   * {
//     color: #F8FAFC;
//   }

//   background-color: #0004;

//   ${({ show }) => !show ? css`
//     opacity: 0;
//     max-height: 0px;
//     animation: ${showSubmenuAnim} .5s linear reverse;
//   ` : css`
//     animation: ${showSubmenuAnim} .5s linear;
//     max-height: 800px;
//     opacity: 1;
//   `}
// `

// export const SubMenuTitle = styled.div.attrs({
//   className: 'hide-justify-center'
// })<{ hasOpen?: boolean }>`
//   display: flex;
//   align-items: center;
//   gap: 132px;

//   padding-left: 8px;
//   padding-right: 24px !important;

//   ${({ hasOpen }) => hasOpen && css`
//     background-color: #0004;
//   `}

//   > span {
//     font-size: 16px;
//   }
// `

export const StyledSpan = styled.span.attrs({
  className: 'hide-none'
})`
`

// export const SubMenuItemTitle = styled.li`
//   font-weight: 600;
//   color: #ffffff40;

//   padding-top: 10px;
// `