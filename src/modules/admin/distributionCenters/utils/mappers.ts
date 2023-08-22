import { CreateMovementType } from "src/services/api/distributionCenters/distributionCenters.types"
import { initialDataFormEntryModal, initialDataFormSupplyQuantityNoticeModal, initialDataFormTransferModal } from "../constants"

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

export const parseEntryFormSubmit = (values: typeof initialDataFormEntryModal) => {

  const products = values.products.map(p => ({ id: p.id_product, quantity: parseInt(p.quantity) }))

  const result: CreateMovementType = {
    id_distribution_center: values.distribution_center,
    operation: 'IN',
    products
  }

  return result
}

export const parseLeaveFormSubmit = (values: typeof initialDataFormEntryModal) => {

  const products = values.products.map(p => ({ id: p.id_product, quantity: parseInt(p.quantity) }))

  const result: CreateMovementType = {
    id_distribution_center: values.distribution_center,
    operation: 'OUT',
    products
  }

  return result
}

export const parseTransferFormSubmit = (values: typeof initialDataFormTransferModal) => {
  const products = values.products.map(p => ({ id: p.id_product, quantity: parseInt(p.quantity) }))

  const result: CreateMovementType = {
    id_distribution_center: values.id_distribution_center_to,
    id_distribution_center_rel: values.id_distribution_center_from,
    operation: 'TRANSFER_IN',
    products
  }

  return result
}