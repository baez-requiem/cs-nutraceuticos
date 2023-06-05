import { useEffect, useRef, useState, SelectHTMLAttributes, FC } from "react"
import { Container, StyledSelect, StyledLabel } from "./styles"

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  color?: string
  label?: string
  labelFixed?: boolean
  block?: boolean
  options?: { label: string, value: number|string }[]
}

const Select: FC<SelectProps> = ({
  label = '',
  color = '',
  block = false,
  labelFixed = false,
  options = [],
  ...props
}) => {
  const [useUpLabel, setUpLabel] = useState(false)
  const selectRef = useRef<HTMLSelectElement>(null)
  
  const verifyUpLabel = () => {
    setUpLabel(!!selectRef.current?.value)
  }
  
  useEffect(() => {
    !!selectRef.current?.value && setUpLabel(true)
  }, [])

  return (
    <Container block={block}>
      <StyledLabel
        hasUp={labelFixed || useUpLabel}
        onClick={() => selectRef.current?.focus()}
      >
        {label}
      </StyledLabel>
      <StyledSelect
        ref={selectRef}
        color={color}
        block={block}
        onFocus={() => setUpLabel(true)}
        onBlur={verifyUpLabel}
        {...props}
      >
        {options.length || props?.value
          ? options.map(opt => (
            <option key={`${opt.value}-${opt.label}`} value={opt.value}>{opt.label}</option>
          ))
          : <option value=""></option>
        }
      </StyledSelect>
    </Container>
  )
}

export default Select