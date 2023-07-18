import styled, { css, keyframes } from "styled-components"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FadeIn = styled.div<{ show: boolean, duration?: number }>`
  display: none;
  opacity: 0;
  transition: opacity ${({ duration = 1000 }) => duration}ms;

  ${({ show, duration }) => show && css`
    display: block;
    opacity: 1;
    animation: ${fadeIn} ${duration}ms ease-in-out forwards;
  `}
`

export default {
  FadeIn
}