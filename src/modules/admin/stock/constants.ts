import { ColorsType } from "src/theme/theme.default"

type StatusVariationsType = {
  [key: string]: { color: ColorsType }
}

export const statusVariations: StatusVariationsType = {
  'Negativo': { color: 'black' },
  'Esgotado': { color: 'red_600' },
  'Abaixo do estoque mínimo': { color: 'orange_500' },
  'Confortável': { color: 'blue_500' }
}