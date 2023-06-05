import { FC } from 'react'

import { IconButton } from "src/components/ui"
import { StyledInput } from "./StyledInput"
import { FaTimes } from "react-icons/fa"

export interface ProductItemProps {
  onRemove: () => void
  name: string
  id: string
}

const ProductItem: FC<ProductItemProps> = ({
  onRemove,
  name,
  id
}) => (
  <tr>
    <td>
      <div>
        {name}
      </div>
    </td>
    <td>
      <div>
        <StyledInput name={`quantity-${id}`} type="number" defaultValue={1} min={1} placeholder="Ex: 10" />
      </div>
    </td>
    <td>
      <div>
        <StyledInput name={`sales-${id}`} type="number" defaultValue={1} min={1} placeholder="Ex: 5" />
      </div>
    </td>
    <td>
      <div>
        100,00
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

export default ProductItem