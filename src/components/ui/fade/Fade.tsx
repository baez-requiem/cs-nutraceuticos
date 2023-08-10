import { useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  from { opacity: 0; max-height: 0px; }
  50% { opacity: 0; max-height: 1000px; }
  to { opacity: 1; max-height: 1000px; }
`;

const FadeInWrapper = styled.div`
  overflow: hidden;
  opacity: 0;
  max-height: 0px;

  transition: all 1s;
  
  &.open {
    opacity: 1;
    max-height: 1000px;
  }
`

const FadeIn = ({ children, show }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef) {
      show
        ? wrapperRef.current.classList.add('open')
        : wrapperRef.current.classList.remove('open')
    }
  }, [show])

  return <FadeInWrapper ref={wrapperRef}>{children}</FadeInWrapper>
}

export default {
  FadeIn
}