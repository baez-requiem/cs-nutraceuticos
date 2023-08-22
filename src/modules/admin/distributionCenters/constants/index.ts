type FormProductType = {
  id_product: string
  quantity: string
  name: string
}

type FormSupplyQuantityNoticeType = {
  active: boolean
} & FormProductType

type FormTransferProductType = {
  max: number
} & FormProductType

const products: FormProductType[] = []
const supply_quantity_notice: FormSupplyQuantityNoticeType[] = []
const transfer_products: FormTransferProductType[] = []

export const initialDataFormEntryModal = {
  product:  '',
  distribution_center:  '',
  products,
}

export const initialDataFormLeaveModal = {
  product:  '',
  distribution_center:  '',
  products,
}

export const initialDataFormSupplyQuantityNoticeModal = {
  id_distribution_center:  '',
  supply_quantity_notice
}

export const initialDataFormTransferModal = {
  product:  '',

  id_distribution_center_from: '',
  id_distribution_center_to: '',

  products: transfer_products
}