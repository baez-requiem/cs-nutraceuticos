import { ChangeEvent, useEffect } from 'react'
import { useFormik } from "formik"
import { initialDataFormSupplyQuantityNoticeModal } from "../constants"
import { DistributionCenterStockType, UpdateDistributionCenterBodyType } from 'src/services/api/distributionCenters/distributionCenters.types'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { distributionCentersApi } from 'src/services/api'
import { parseSupplyQuantityNoticeFormSubmit } from '../utils/mappers'
import { useRefetchQueries } from 'src/hooks'

interface UseSupplyQuantityNoticeModalProps {
  show: boolean
  onClose: () => void
  data?: DistributionCenterStockType
}

const useSupplyQuantityNoticeModal = ({ onClose, show, data }: UseSupplyQuantityNoticeModalProps) => {

  const { refetchQueries } = useRefetchQueries()

  const mutationDistributionCenter = useMutation(async (body: UpdateDistributionCenterBodyType) => {
    const toastId = toast.loading(`Inserindo dados...`)

    const ok = await distributionCentersApi.updateDistributionCenter(body)

    toast.dismiss(toastId)

    ok
      ? toast.success(`Alertas atualizados com sucesso!`)
      : toast.error(`Houve um erro ao atualizar os dados.`)

    ok && refetchQueries(['distribution-centers/stock'])

    onClose()
  })

  const formik = useFormik({
    initialValues: initialDataFormSupplyQuantityNoticeModal,
    onSubmit: values => mutationDistributionCenter.mutateAsync(parseSupplyQuantityNoticeFormSubmit(values))
  })

  const handleSwitchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = evt.target

    formik.setFieldValue(name, checked)
  }

  useEffect(() => {
    if (data?.id) {
      formik.setValues({
        id_distribution_center: data.id,
        supply_quantity_notice: data.stock.map(s => ({
          id_product: s.id,
          name: s.name,
          quantity: s.supply_quantity_notice?.toString() || '0',
          active: !!s.supply_quantity_notice,
        }))
      })
    } else {
      formik.resetForm()
    }
  }, [data])

  return {
    formik,
    handleSwitchChange
  }
}

export { useSupplyQuantityNoticeModal }