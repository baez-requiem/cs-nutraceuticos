import { useEffect, useRef, useState, TextareaHTMLAttributes, FC } from "react"
import { Container, StyledTextarea, StyledLabel } from "./styles"

export interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  color?: string
  label?: string
  labelFixed?: boolean
  block?: boolean
}

const Textarea: FC<InputProps> = ({
  label = '',
  color = '',
  block = false,
  labelFixed = false,
  ...props
}) => {
  const [useUpLabel, setUpLabel] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const verifyUpLabel = () => {
    setUpLabel(!!textareaRef.current?.value)
  }
  
  useEffect(() => {
    !!textareaRef.current?.value && setUpLabel(true)
  }, [])

  return (
    <Container block={block}>
      <StyledLabel
        hasUp={labelFixed || useUpLabel}
        onClick={() => textareaRef.current?.focus()}
      >
        {label}
      </StyledLabel>
      <StyledTextarea
        ref={textareaRef}
        color={color}
        block={block}
        onFocus={() => setUpLabel(true)}
        onBlur={verifyUpLabel}
        {...props}
      />
    </Container>
  )
}

export default Textarea