import { FC } from "react"
import { Grid, Text } from "src/components/ui"

interface TextFieldProps {
  label: string
  value: string | number
}

const TextField: FC<TextFieldProps> = ({ label, value = '' }) => {

  return (
    <Grid gap={5}>
      <Text color="black">{label}</Text>
      <Text color="gray_900">{value}</Text>
      <div></div>
    </Grid>
  )
}

export { TextField }