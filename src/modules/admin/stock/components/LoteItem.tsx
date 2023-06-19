import { FC, useState, ChangeEvent, useEffect } from 'react'

import { IconButton } from "src/components/ui"
import { StyledInput } from "./StyledInput"
import { FaTimes } from "react-icons/fa"

import { floatToReal, numberFormat, onlyNumbers } from 'src/utils/number.utils'

export interface LoteItemProps {
  onRemove: () => void
  name: string
  id: string
  quantity?: number
  unit_amount?: number
}

const LoteItem: FC<LoteItemProps> = ({
  onRemove,
  name,
  id,
  quantity,
  unit_amount
}) => {
  const [amount, setAmount] = useState('')

  const onAmountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = numberFormat(parseInt(onlyNumbers(evt.currentTarget.value))/100, 2, ',', '.')
    setAmount(value)
  }

  useEffect(() => {
    unit_amount && setAmount(floatToReal(unit_amount))
  }, [unit_amount])

  return (
    <tr>
      <td>
        <div>
          {name} 
        </div>
      </td>
      <td>
        <div>
          <StyledInput
            min={1}
            name={`quantity--${id}`}
            type="number"
            placeholder="Ex: 100"
            defaultValue={quantity}
          />
        </div>
      </td>
      <td>
        <div>
          <StyledInput
            name={`unit_amount--${id}`}
            placeholder="Ex: 20,00"
            onChange={onAmountChange}
            value={amount}
          />
        </div>
      </td>
      <td>
        <div>
          <IconButton color="red_600" onClick={onRemove}>
            <FaTimes size={18} color="white" />
          </IconButton>
        </div>
      </td>
    </tr>
  )
}

export default LoteItem