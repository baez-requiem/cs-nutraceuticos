import styled, { keyframes } from "styled-components"

const prixClipFix = keyframes`
  0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
  25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
  50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
  75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
  100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
`

export const StyledLoader = styled.span<{ ms: number }>`
  width: 16px;
  height: 16px;
  border: 4px solid #FFF;
  border-radius: 50%;
  position: relative;
  transform:rotate(45deg);
  box-sizing: border-box;

  ::before {
    content: "";
    position: absolute;
    box-sizing: border-box;
    inset: -5px;
    border-radius: 50%;
    border: 5px solid ${({ theme }) => theme.colors.blue_400};
    animation: ${prixClipFix} ${({ ms }) => ms}ms infinite linear;
  }
`