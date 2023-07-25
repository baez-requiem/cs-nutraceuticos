import { useEffect, useRef, useState, InputHTMLAttributes, FC } from "react"
import { Container, StyledInput, StyledLabel } from "./styles"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  color?: string
  label?: string
  labelFixed?: boolean
  block?: boolean
  size?: number
  error?: string
}

const Input: FC<InputProps> = ({
  error = '',
  label = '',
  color = '',
  block = false,
  labelFixed = false,
  size,
  ...props
}) => {
  const [useUpLabel, setUpLabel] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const verifyUpLabel = () => {
    setUpLabel(!!inputRef.current?.value)
  }
  
  useEffect(() => {
    !!inputRef.current?.value && setUpLabel(true)
  }, [])

  return (
    <Container block={block} size={size}>
      <StyledLabel
        hasUp={labelFixed || useUpLabel}
        onClick={() => inputRef.current?.focus()}
      >
        {label}
      </StyledLabel>
      <StyledInput
        hasUpLabel={labelFixed || useUpLabel}
        hasError={!!error}
        size={size}
        ref={inputRef}
        color={color}
        block={block}
        onFocus={() => setUpLabel(true)}
        onBlur={verifyUpLabel}
        onChangeCapture={verifyUpLabel}
        {...props}
      />
    </Container>
  )
}

export default Input