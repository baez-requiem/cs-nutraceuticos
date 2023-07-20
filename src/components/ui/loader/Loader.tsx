import styled, { keyframes } from "styled-components"

const pulsInAnim = keyframes`
  0% {
    box-shadow: inset 0 0 0 1rem #000;
    opacity: 1;
  }
  50%, 100% {
    box-shadow: inset 0 0 0 0 #000;
    opacity: 0;
  }
`

const pulsOutAnim = keyframes`
  0%, 50% {
    box-shadow: 0 0 0 0 #000;
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 1rem #000;
    opacity: 1;
  }
`

const Loader = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  
  position: relative;
  
  width: 100%;
  max-width: 6rem;
  
  margin-top: 3rem;
  margin-bottom: 3rem;
  
 :before, :after {
    content: "";
    position: absolute;
    border-radius: 50%;
    animation: ${pulsOutAnim} 1.8s ease-in-out infinite;
    filter: drop-shadow(0 0 1rem rgba(000, 000, 000, 0.75));
  }

  :before {
    width: 100%;
    padding-bottom: 100%;
    box-shadow: inset 0 0 0 1rem #000;
    animation-name: ${pulsInAnim};
  }
  
  :after {
    width: calc(100% - 2rem);
    padding-bottom: calc(100% - 2rem);
    box-shadow: 0 0 0 0 #000;
  }      
`

export default Loader