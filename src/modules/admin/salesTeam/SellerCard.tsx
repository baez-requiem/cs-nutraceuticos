import { FC } from "react"
import { FaTimes } from "react-icons/fa"
import { Badge, Divider, Flex, IconButton, Text } from "src/components/ui"

export interface SellerCardProps {
  name: string
}

const SellerCard: FC<SellerCardProps> = ({
  name
}) => (
  <Badge block color="gray_100">
    <Flex justify="space-between" items="center">
      <Text size="sm">#1 {name}</Text>
      <IconButton size={20}>
        <FaTimes color="#a00" />
      </IconButton>
    </Flex>
  </Badge>
)

export default SellerCard