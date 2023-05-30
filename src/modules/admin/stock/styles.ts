import styled, { css } from "styled-components";

export const TabActions = styled.div`
  display: flex;
`

export const TabButton = styled.button<{ active?: boolean }>`
  font-size: 14px;
  padding: 0px 30px;
  height: 40px;

  border: none;
  border-right: 1px solid;
  border-top: 1px solid;
  
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  border-bottom: 1px solid;

  cursor: pointer;

  :first-child {
    border-left: 1px solid;
  }

  ${({ active }) => active && css`
    background-color: #fff;
    border-bottom: 1px solid #fff;
  `}
`