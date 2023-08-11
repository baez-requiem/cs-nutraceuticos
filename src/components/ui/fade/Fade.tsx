import { useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"

const FadeInWrapper = styled.div<{mh: number}>`
  overflow: hidden;
  opacity: 0;
  max-height: 0px;

  transition: all 1s linear;
  
  &.open {
    opacity: 1;
    max-height: ${({ mh }) => mh}px;
  }
`

const FadeIn = ({ children, show, mh = 1000 }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef) {
      show
        ? wrapperRef.current.classList.add('open')
        : wrapperRef.current.classList.remove('open')
    }
  }, [show])

  return <FadeInWrapper ref={wrapperRef} mh={mh}>{children}</FadeInWrapper>
}

export default {
  FadeIn
}