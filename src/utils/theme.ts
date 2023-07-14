import { ColorsType, colors } from "src/theme/theme.default";

export const matchColor = (color: string | ColorsType): ColorsType|undefined => {
  if (color in colors) {
    return color as ColorsType;
  }
  return undefined;
}