import { FC, InputHTMLAttributes, ReactNode } from 'react'
import { InputContainer } from '../styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode
}

const Input: FC<InputProps> = ({ icon, ...props }) => {
  return (
    <InputContainer>
      <div>{icon}</div>
      <input type="text" {...props} />
    </InputContainer>
  )
}

export default Input
