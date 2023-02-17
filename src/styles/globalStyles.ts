import { createGlobalStyle, css } from "styled-components"

export default createGlobalStyle`
  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
    font-size: 87.5%;

    min-width: 320px;
  }

  body, #root {
    min-width: 320px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    user-select: none;

    font-family: 'Inter', sans-serif;
  }

  ::-webkit-scrollbar {
    width: 7.5px;
    height: 7.5px;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #999;
  }

  textarea:focus, select:focus, input:focus{
    outline: none;
  }

  a {
    all: unset;
  }

  ${({ theme }) => theme.mode === 'dark' && css`
    ::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
  `}
`