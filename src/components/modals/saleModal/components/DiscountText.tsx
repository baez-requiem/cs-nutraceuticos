import { Flex, Text } from "src/components/ui"
import { floatToReal, onlyNumbers, realToFloat } from "src/utils/number.utils"
import styled from "styled-components"

const StyledText = styled(Text)<{ hasDiscount: boolean }>`
  text-decoration: ${({ hasDiscount }) => hasDiscount ? 'line-through' : 'unset'};
  font-size: ${({ hasDiscount }) => hasDiscount ? '12' : '14'}px;
  color: ${({ hasDiscount }) => hasDiscount ? '#666' : 'inherit'};
  opacity: ${({ hasDiscount }) => hasDiscount ? 0.8 : 1};
  text-align: right;
`


const DiscountText = ({ total, discount }) => {

  const hasDiscount = !!parseInt(onlyNumbers(discount))
  const newValue = realToFloat(total || '0') - realToFloat(discount || '0')

  return (
    <Flex gap={5} items="end" justify="end">
      <StyledText hasDiscount={hasDiscount}>{total}</StyledText>
      {hasDiscount ? (
        <Text color="green_700">{floatToReal(newValue)}</Text>
      ) : null}
    </Flex>
  )
}

export default DiscountText