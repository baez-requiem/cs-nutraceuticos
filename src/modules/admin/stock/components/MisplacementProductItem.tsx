import { FC } from 'react'

import { IconButton } from "src/components/ui"
import { StyledInput } from "./StyledInput"
import { FaTimes } from "react-icons/fa"

export interface MisplacementProductItemProps {
  onRemove: () => void
  name: string
  id: string
}

const MisplacementProductItem: FC<MisplacementProductItemProps> = ({
  onRemove,
  name,
  id,
}) => {


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

export default MisplacementProductItem