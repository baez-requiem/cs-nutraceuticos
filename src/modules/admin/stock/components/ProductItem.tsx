import { FC } from 'react'

import { Flex, IconButton } from "src/components/ui"
import { StyledInput } from "./StyledInput"
import { FaTimes } from "react-icons/fa"

import { FormikHandlers } from 'formik'
import { floatToReal } from 'src/utils/number.utils'

export interface ProductItemProps {
  onRemove: () => void
  id_product: string
  quantity: number | string
  sales_quantity: number | string
  idx: number
  name: string
  handleChange: FormikHandlers['handleChange']
  amount: number
}

const ProductItem: FC<ProductItemProps> = ({
  onRemove,
  name,
  idx,
  quantity,
  sales_quantity,
  handleChange,
  amount
}) => (
  <tr>
    <td>
      <Flex justify='space-between'>
        <span>{name}</span>
        <span>{floatToReal(amount)} Und.</span>
      </Flex>
    </td>
    <td>
      <div>
        <StyledInput
          type="number"
          name={`products.${idx}.quantity`}
          value={quantity}
          min={1}
          onChange={handleChange}
          placeholder="Ex: 10"
        />
      </div>
    </td>
    <td>
      <div>
        <StyledInput
          type="number"
          min={1}
          value={sales_quantity}
          placeholder="Ex: 5"
          onChange={handleChange}
          name={`products.${idx}.sales_quantity`}
        />
      </div>
    </td>
    <td>
      <div>
        {floatToReal(amount * parseInt(quantity.toString()))}
      </div>
    </td>
    <td>
      <div>
        <IconButton color="red_600" onClick={onRemove} type="button">
          <FaTimes size={18} color="white" />
        </IconButton>
      </div>
    </td>
  </tr>
)

export default ProductItem