import { FC, useState, ChangeEvent } from 'react'

import { IconButton } from "src/components/ui"
import { StyledInput } from "./StyledInput"
import { FaTimes } from "react-icons/fa"

import { numberFormat, onlyNumbers } from 'src/utils/number.utils'

export interface LoteItemProps {
  onRemove: () => void
  name: string
  id: number
}

const LoteItem: FC<LoteItemProps> = ({
  onRemove,
  name,
  id
}) => {
  const [amount, setAmout] = useState('')

  const onAmountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = numberFormat(parseInt(onlyNumbers(evt.currentTarget.value))/100, 2, ',', '.')
    setAmout(value)
  }

  return (
    <tr>
      <td>
        <div>
          {name}
        </div>
      </td>
      <td>
        <div>
          <StyledInput name={`quantity-${id}`} type="number" placeholder="Ex: 100" />
        </div>
      </td>
      <td>
        <div>
          <StyledInput
            name={`amount-${id}`}
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