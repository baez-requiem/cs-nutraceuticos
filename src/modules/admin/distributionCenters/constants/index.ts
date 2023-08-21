type FormProductType = {
  id_product: string
  quantity: string
  name: string
}

type FormSupplyQuantityNoticeType = {
  active: boolean
} & FormProductType

const products: FormProductType[] = []
const supply_quantity_notice: FormSupplyQuantityNoticeType[] = []

export const initialDataFormEntryModal = {
  distribution_center:  '',
  products,
}

export const initialDataFormSupplyQuantityNoticeModal = {
  id_distribution_center:  '',
  supply_quantity_notice
}