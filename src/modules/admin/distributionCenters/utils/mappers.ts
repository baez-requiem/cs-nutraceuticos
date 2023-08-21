import { initialDataFormSupplyQuantityNoticeModal } from "../constants"

export const parseSupplyQuantityNoticeFormSubmit = (values: typeof initialDataFormSupplyQuantityNoticeModal) => {

  const supply_quantity_notice = values.supply_quantity_notice
    .filter(sqn => sqn.active)
    .map(sqn => ({
      id_product: sqn.id_product,
      quantity: parseInt(sqn.quantity)
    }))

  const result = {
    id: values.id_distribution_center,
    supply_quantity_notice
  }

  return result
}